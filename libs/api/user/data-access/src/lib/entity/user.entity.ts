import { Field, HideField, ObjectType } from '@nestjs/graphql'
import { PagingResponse } from '@pubkey-link/api-core-data-access'
import { UserRole } from './user-role.enum'
import { UserStatus } from './user-status.enum'

@ObjectType()
export class User {
  @Field()
  id!: string
  @Field({ nullable: true })
  createdAt?: Date
  @Field({ nullable: true })
  updatedAt?: Date
  @Field({ nullable: true })
  lastLogin?: Date | null
  @Field(() => UserRole, { nullable: true })
  role?: UserRole
  @Field(() => UserStatus, { nullable: true })
  status?: UserStatus
  @Field({ nullable: true })
  avatarUrl?: string | null
  @Field({ nullable: true })
  developer!: boolean
  @Field({ nullable: true })
  private!: boolean
  @Field({ nullable: true })
  name?: string | null
  @Field({ nullable: true })
  pubkeyProfile?: string | null
  @Field({ nullable: true })
  username!: string
  @HideField()
  identities?: unknown[] | null
}

@ObjectType()
export class UserPaging extends PagingResponse<User>(User) {}
