import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@pubkey-link/api-core-data-access'
import { ApiBuyService } from './api-buy.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiBuyService],
  exports: [ApiBuyService],
})
export class ApiBuyDataAccessModule {}
