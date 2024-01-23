import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import {
  ApiRuleService,
  Rule,
  RuleCondition,
  RulePaging,
  UserCreateRuleInput,
  UserFindManyRuleInput,
  UserUpdateRuleInput,
} from '@pubkey-link/api-rule-data-access'
import { ApiAuthGraphQLUserGuard } from '@pubkey-link/api-auth-data-access'
import { UseGuards } from '@nestjs/common'

@Resolver()
@UseGuards(ApiAuthGraphQLUserGuard)
export class ApiUserRuleResolver {
  constructor(private readonly service: ApiRuleService) {}

  @Mutation(() => Rule, { nullable: true })
  userCreateRule(@Args('input') input: UserCreateRuleInput) {
    return this.service.user.createRule(input)
  }

  @Mutation(() => Boolean, { nullable: true })
  userDeleteRule(@Args('ruleId') ruleId: string) {
    return this.service.user.deleteRule(ruleId)
  }

  @Query(() => RulePaging)
  userFindManyRule(@Args('input') input: UserFindManyRuleInput) {
    return this.service.user.findManyRule(input)
  }

  @Query(() => Rule, { nullable: true })
  userFindOneRule(@Args('ruleId') ruleId: string) {
    return this.service.user.findOneRule(ruleId)
  }

  @Mutation(() => [RuleCondition], { nullable: true })
  userValidateRule(@Args('ruleId') ruleId: string, @Args('address') address: string) {
    return this.service.user.validateRule(ruleId, address)
  }

  @Mutation(() => Rule, { nullable: true })
  userUpdateRule(@Args('ruleId') ruleId: string, @Args('input') input: UserUpdateRuleInput) {
    return this.service.user.updateRule(ruleId, input)
  }
}
