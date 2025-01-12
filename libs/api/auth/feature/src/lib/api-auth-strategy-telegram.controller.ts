import { Controller, Post, Body, UseGuards, Req, Res } from '@nestjs/common'
import { objectToAuthDataMap, AuthDataValidator } from "@telegram-auth/server"
import { IdentityProvider } from '@prisma/client'
import { ApiAnonJwtGuard } from '@pubkey-link/api-auth-data-access'
import { ApiAuthRequest } from '@pubkey-link/api-auth-data-access'
import { ApiAuthStrategyService } from 'libs/api/auth/data-access/src/lib/strategies/api-auth-strategy.service'
import { ApiAuthService } from '@pubkey-link/api-auth-data-access'
import { Response } from 'express-serve-static-core'

interface TelegramAuthPayload {
  id: number
  first_name: string
  last_name?: string
  username?: string
  photo_url?: string
  auth_date: number
  hash: string
}

@Controller('auth/telegram')
export class ApiAuthStrategyTelegramController {
  private validator: AuthDataValidator
  constructor(private readonly authStrategy: ApiAuthStrategyService, private readonly service: ApiAuthService) {
    this.validator = new AuthDataValidator({
      botToken: process.env['TELEGRAM_BOT_TOKEN'] as string,
    })
  }

  @Post('validate')
  @UseGuards(ApiAnonJwtGuard)
  async validateTelegram(@Body() data: TelegramAuthPayload, @Req() req: ApiAuthRequest) {
    try {
      const authData = objectToAuthDataMap(JSON.parse(JSON.stringify(data)))
      const user = await this.validator.validate(authData)

      if (!user || user.id !== data.id) {
        throw new Error('User ID mismatch')
      }

      return this.authStrategy.validateRequest({
        req,
        providerId: user.id.toString(),
        provider: IdentityProvider.Telegram,
        accessToken: '', // Telegram doesn't use OAuth tokens
        refreshToken: '',
        profile: {
          username: user.username,
          name: `${data.first_name}${data.last_name ? ' ' + data.last_name : ''}`,
          avatarUrl: data.photo_url,
        },
      })
    } catch (error) {
      console.error('Error processing request:', error)
      throw new Error('Invalid Telegram authentication data')
    }
  }

  @Post('signin')
  @UseGuards(ApiAnonJwtGuard)
  async signInWithTelegram(
    @Body() data: TelegramAuthPayload,
    @Req() req: ApiAuthRequest,
    @Res({ passthrough: true }) res: Response
  ) {
    try {
      const authData = objectToAuthDataMap(JSON.parse(JSON.stringify(data)))
      const user = await this.validator.validate(authData)

      if (!user || user.id !== data.id) {
        throw new Error('User ID mismatch')
      }

      // First validate the request to create/update the user
      const validatedUser = await this.authStrategy.validateRequest({
        req,
        providerId: user.id.toString(),
        provider: IdentityProvider.Telegram,
        accessToken: '',
        refreshToken: '',
        profile: {
          username: user.username,
          name: `${data.first_name}${data.last_name ? ' ' + data.last_name : ''}`,
          avatarUrl: data.photo_url,
        },
      })

      // Assign the validated user to the request
      req.user = validatedUser

      // Then redirect with cookie set
      return this.service.userCookieRedirect(req, res)
    } catch (error) {
      console.error('Error processing signin:', error)
      throw new Error('Invalid Telegram authentication data')
    }
  }
}
