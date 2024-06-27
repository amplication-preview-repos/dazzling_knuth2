import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { RechargeIntegrationServiceBase } from "./base/rechargeIntegration.service.base";

@Injectable()
export class RechargeIntegrationService extends RechargeIntegrationServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
