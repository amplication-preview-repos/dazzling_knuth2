import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import { RechargeIntegrationService } from "./rechargeIntegration.service";
import { RechargeIntegrationControllerBase } from "./base/rechargeIntegration.controller.base";

@swagger.ApiTags("rechargeIntegrations")
@common.Controller("rechargeIntegrations")
export class RechargeIntegrationController extends RechargeIntegrationControllerBase {
  constructor(protected readonly service: RechargeIntegrationService) {
    super(service);
  }
}
