import { Injectable } from '@nestjs/common'
import { ApiUserDataAdminService } from './api-user-data-admin.service'
import { ApiUserDataUserService } from './api-user-data-user.service'
import { ApiUserDataService } from './api-user-data.service'

@Injectable()
export class ApiUserService {
  constructor(
    readonly admin: ApiUserDataAdminService,
    readonly data: ApiUserDataService,
    readonly user: ApiUserDataUserService,
  ) {}
}
