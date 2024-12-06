import { Module } from '@nestjs/common'
import { ApiCoreConfigModule } from '../config/api-core-config.module'
import { ApiCoreProtocolController } from './api-core-protocol.controller'
import { ApiCoreProtocolService } from './api-core-protocol.service'

@Module({
  controllers: [ApiCoreProtocolController],
  imports: [ApiCoreConfigModule],
  providers: [ApiCoreProtocolService],
  exports: [ApiCoreProtocolService],
})
export class ApiCoreProtocolModule {}
