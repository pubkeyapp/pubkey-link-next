import { Injectable } from '@nestjs/common'
import { IdentityProvider } from '@prisma/client'
import { AuthDataValidator, objectToAuthDataMap } from '@telegram-auth/server'
import { Response } from 'express-serve-static-core'
import { ApiAuthService } from '../api-auth.service'
import { ApiAuthRequest } from '../interfaces/api-auth.request'
import { ApiAuthStrategyService } from './api-auth-strategy.service'

export interface TelegramAuthPayload {
  id: number
  first_name: string
  last_name?: string
  username?: string
  photo_url?: string
  auth_date: number
  hash: string
}

@Injectable()
export class ApiAuthStrategyTelegramService {
  private validator = new AuthDataValidator({
    // botToken: this.core.config.authTelegramBotToken
    botToken: process.env['AUTH_TELEGRAM_BOT_TOKEN'] as string,
  })
  constructor(
    private readonly authService: ApiAuthService,
    private readonly authStrategyService: ApiAuthStrategyService,
  ) {}

  async link(input: TelegramAuthPayload, req: ApiAuthRequest) {
    try {
      const authData = objectToAuthDataMap(JSON.parse(JSON.stringify(input)))
      const user = await this.validator.validate(authData)

      if (!user || user.id !== input.id) {
        throw new Error('User ID mismatch')
      }

      return this.authStrategyService.validateRequest({
        req,
        providerId: user.id.toString(),
        provider: IdentityProvider.Telegram,
        accessToken: '', // Telegram doesn't use OAuth tokens
        refreshToken: '',
        profile: {
          username: user.username,
          name: `${input.first_name}${input.last_name ? ' ' + input.last_name : ''}`,
          avatarUrl: input.photo_url,
        },
      })
    } catch (error) {
      console.error('Error processing request:', error)
      throw new Error('Invalid Telegram authentication data')
    }
  }

  async login(input: TelegramAuthPayload, req: ApiAuthRequest, res: Response) {
    try {
      const authData = objectToAuthDataMap(JSON.parse(JSON.stringify(input)))
      const user = await this.validator.validate(authData)

      if (user?.id !== input.id) {
        throw new Error('User ID mismatch')
      }

      // First validate the request to create/update the user
      const validatedUser = await this.authStrategyService.validateRequest({
        req,
        providerId: user.id.toString(),
        provider: IdentityProvider.Telegram,
        accessToken: '',
        refreshToken: '',
        profile: {
          username: user.username,
          name: `${input.first_name}${input.last_name ? ' ' + input.last_name : ''}`,
          avatarUrl: input.photo_url,
        },
      })

      // Assign the validated user to the request
      req.user = validatedUser

      // Then redirect with cookie set
      return this.authService.userCookieRedirect(req, res)
    } catch (error) {
      console.error('Error processing login:', error)
      throw new Error('Invalid Telegram authentication data')
    }
  }
}
