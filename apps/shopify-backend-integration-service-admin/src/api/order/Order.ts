import { Customer } from "../customer/Customer";
import { Product } from "../product/Product";

export type Order = {
  createdAt: Date;
  customer?: Customer | null;
  id: string;
  orderDate: Date | null;
  orderNumber: string | null;
  products?: Array<Product>;
  status?: "Option1" | null;
  totalPrice: number | null;
  updatedAt: Date;
};
