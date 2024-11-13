import { Controller, Get, NotFoundException, Param } from '@nestjs/common'
import { ApiCoreService } from '@pubkey-link/api-core-data-access'
import { IdentityProvider } from '@pubkey-protocol/sdk'

@Controller('ppl')
export class ApiCoreProtocolController {
  constructor(private readonly service: ApiCoreService) {}

  @Get('communities')
  communities() {
    return this.service.protocol.getCommunities()
  }

  @Get('community/:community')
  async community(@Param('community') community: string) {
    const found = await this.service.protocol.getCommunity({ community })
    if (found) {
      return found
    }
    throw new NotFoundException('Profile not found')
  }

  @Get('pointers')
  pointers() {
    return this.service.protocol.getPointers()
  }

  @Get('profiles')
  profiles() {
    return this.service.protocol.getProfiles()
  }

  @Get('providers')
  providers() {
    return this.service.protocol.getProviders()
  }

  @Get('provider/:provider/:providerId')
  async profileByProvider(@Param('provider') provider: IdentityProvider, @Param('providerId') providerId: string) {
    const found = await this.service.protocol.getProfileByProvider({ providerId, provider })
    if (found) {
      return found
    }
    throw new NotFoundException('Profile not found')
  }

  @Get('profile/:username')
  async profileByUsername(@Param('username') username: string) {
    const found = await this.service.protocol.getProfileByUsername({ username })
    if (found) {
      return found
    }
    throw new NotFoundException('Profile not found')
  }
}
