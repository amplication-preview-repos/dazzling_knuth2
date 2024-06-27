import { DateTimeNullableFilter } from "../../util/DateTimeNullableFilter";
import { StringFilter } from "../../util/StringFilter";
import { StringNullableFilter } from "../../util/StringNullableFilter";

export type RechargeIntegrationWhereInput = {
  deliveryDate?: DateTimeNullableFilter;
  id?: StringFilter;
  rechargeCustomerId?: StringNullableFilter;
  rechargeSubscriptionId?: StringNullableFilter;
};
