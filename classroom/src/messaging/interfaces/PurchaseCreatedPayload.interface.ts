import { Customer } from "./Customer.interface";
import { Product } from "./Product.interface";

export interface PurchaseCreatedPaylod {
  customer: Customer;
  product: Product;
}

