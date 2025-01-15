import { Resolver } from '@nestjs/graphql'
import { ApiBuyService } from '@pubkey-link/api-buy-data-access'

@Resolver()
export class ApiBuyResolver {
  constructor(private readonly service: ApiBuyService) {}
}
