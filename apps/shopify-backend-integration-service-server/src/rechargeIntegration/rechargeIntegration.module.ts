import { Module } from "@nestjs/common";
import { RechargeIntegrationModuleBase } from "./base/rechargeIntegration.module.base";
import { RechargeIntegrationService } from "./rechargeIntegration.service";
import { RechargeIntegrationController } from "./rechargeIntegration.controller";
import { RechargeIntegrationResolver } from "./rechargeIntegration.resolver";

@Module({
  imports: [RechargeIntegrationModuleBase],
  controllers: [RechargeIntegrationController],
  providers: [RechargeIntegrationService, RechargeIntegrationResolver],
  exports: [RechargeIntegrationService],
})
export class RechargeIntegrationModule {}
