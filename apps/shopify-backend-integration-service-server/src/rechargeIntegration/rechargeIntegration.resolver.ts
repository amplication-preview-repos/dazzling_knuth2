import * as graphql from "@nestjs/graphql";
import { RechargeIntegrationResolverBase } from "./base/rechargeIntegration.resolver.base";
import { RechargeIntegration } from "./base/RechargeIntegration";
import { RechargeIntegrationService } from "./rechargeIntegration.service";

@graphql.Resolver(() => RechargeIntegration)
export class RechargeIntegrationResolver extends RechargeIntegrationResolverBase {
  constructor(protected readonly service: RechargeIntegrationService) {
    super(service);
  }
}
