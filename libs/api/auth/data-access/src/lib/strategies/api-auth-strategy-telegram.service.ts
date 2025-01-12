import { Injectable } from '@nestjs/common'
import { IdentityProvider } from '@prisma/client'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
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
    botToken: this.core.config.authTelegramBotToken,
  })
  constructor(
    private readonly core: ApiCoreService,
    private readonly authService: ApiAuthService,
    private readonly authStrategyService: ApiAuthStrategyService,
  ) {}

  async link(input: TelegramAuthPayload, req: ApiAuthRequest) {
    try {
      return this.verifyInput(req, input)
    } catch (error) {
      console.error('Error processing request:', error)
      throw new Error('Invalid Telegram authentication data')
    }
  }

  async login(input: TelegramAuthPayload, req: ApiAuthRequest, res: Response) {
    try {
      // Assign the validated user to the request
      req.user = await this.verifyInput(req, input)

      // Then redirect with cookie set
      return this.authService.userCookieRedirect(req, res)
    } catch (error) {
      console.error('Error processing login:', error)
      throw new Error('Invalid Telegram authentication data')
    }
  }

  private async verifyInput(req: ApiAuthRequest, input: TelegramAuthPayload) {
    const authData = objectToAuthDataMap(JSON.parse(JSON.stringify(input)))
    const user = await this.validator.validate(authData)

    if (user?.id !== input.id) {
      throw new Error('User ID mismatch')
    }

    return await this.authStrategyService.validateRequest({
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
  }
}
