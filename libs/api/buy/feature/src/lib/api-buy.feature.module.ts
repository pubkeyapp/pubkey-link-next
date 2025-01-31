import { Module } from '@nestjs/common'
import { ApiBuyDataAccessModule } from '@pubkey-link/api-buy-data-access'
import { ApiBuyResolver } from './api-buy.resolver'

@Module({
  imports: [ApiBuyDataAccessModule],
  providers: [ApiBuyResolver],
})
export class ApiBuyFeatureModule {}
