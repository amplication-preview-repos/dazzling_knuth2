import { RechargeIntegration as TRechargeIntegration } from "../api/rechargeIntegration/RechargeIntegration";

export const RECHARGEINTEGRATION_TITLE_FIELD = "rechargeCustomerId";

export const RechargeIntegrationTitle = (
  record: TRechargeIntegration
): string => {
  return record.rechargeCustomerId?.toString() || String(record.id);
};
