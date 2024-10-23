import { Controller, Get, NotFoundException, Param } from '@nestjs/common'
import { IdentityProvider } from '@pubkey-protocol/sdk'
import { ApiCoreProtocolService } from './api-core-protocol.service'

@Controller('protocol')
export class ApiCoreProtocolController {
  constructor(private readonly service: ApiCoreProtocolService) {}

  @Get('communities')
  communities() {
    return this.service.getCommunities()
  }

  @Get('community/:community')
  async community(@Param('community') community: string) {
    const found = await this.service.getCommunity({ community })
    if (found) {
      return found
    }
    throw new NotFoundException('Profile not found')
  }

  @Get('pointers')
  pointers() {
    return this.service.getPointers()
  }

  @Get('profiles')
  profiles() {
    return this.service.getProfiles()
  }

  @Get('providers')
  providers() {
    return this.service.getProviders()
  }

  @Get('provider/:provider/:providerId')
  async profileByProvider(@Param('provider') provider: IdentityProvider, @Param('providerId') providerId: string) {
    const found = await this.service.getProfileByProvider({ providerId, provider })
    if (found) {
      return found
    }
    throw new NotFoundException('Profile not found')
  }

  @Get('profile/:username')
  async profileByUsername(@Param('username') username: string) {
    const found = await this.service.getProfileByUsername({ username })
    if (found) {
      return found
    }
    throw new NotFoundException('Profile not found')
  }
}
