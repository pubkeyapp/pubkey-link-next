import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common'
import {
  ApiAnonJwtGuard,
  ApiAuthJwtGuard,
  ApiAuthRequest,
  ApiAuthStrategyTelegramService,
  TelegramAuthPayload,
} from '@pubkey-link/api-auth-data-access'
import { Response } from 'express-serve-static-core'

@Controller('auth/telegram')
export class ApiAuthStrategyTelegramController {
  constructor(private readonly service: ApiAuthStrategyTelegramService) {}

  @Post('link')
  @UseGuards(ApiAuthJwtGuard)
  async link(@Body() data: TelegramAuthPayload, @Req() req: ApiAuthRequest) {
    return this.service.link(data, req)
  }

  @Post('login')
  @UseGuards(ApiAnonJwtGuard)
  async login(@Body() data: TelegramAuthPayload, @Req() req: ApiAuthRequest, @Res() res: Response) {
    return this.service.login(data, req, res)
  }
}
