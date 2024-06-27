import { CustomerWhereUniqueInput } from "../customer/CustomerWhereUniqueInput";
import { ProductCreateNestedManyWithoutOrdersInput } from "./ProductCreateNestedManyWithoutOrdersInput";

export type OrderCreateInput = {
  customer?: CustomerWhereUniqueInput | null;
  orderDate?: Date | null;
  orderNumber?: string | null;
  products?: ProductCreateNestedManyWithoutOrdersInput;
  status?: "Option1" | null;
  totalPrice?: number | null;
};
