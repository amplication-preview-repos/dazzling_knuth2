import { SortOrder } from "../../util/SortOrder";

export type RechargeIntegrationOrderByInput = {
  createdAt?: SortOrder;
  deliveryDate?: SortOrder;
  id?: SortOrder;
  rechargeCustomerId?: SortOrder;
  rechargeSubscriptionId?: SortOrder;
  updatedAt?: SortOrder;
};
