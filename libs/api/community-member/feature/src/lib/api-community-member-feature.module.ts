import { Module } from '@nestjs/common'
import { ApiCommunityMemberDataAccessModule } from '@pubkey-link/api-community-member-data-access'
import { ApiAdminCommunityMemberResolver } from './api-admin-community-member.resolver'
import { ApiCommunityMemberResolver } from './api-community-member.resolver'
import { ApiUserCommunityMemberResolver } from './api-user-community-member.resolver'

@Module({
  imports: [ApiCommunityMemberDataAccessModule],
  providers: [ApiAdminCommunityMemberResolver, ApiCommunityMemberResolver, ApiUserCommunityMemberResolver],
})
export class ApiCommunityMemberFeatureModule {}
