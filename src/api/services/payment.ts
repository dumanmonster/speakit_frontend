import { api } from "..";
import { IProduct } from "../interfaces";

export default {
  createPaymentIntent: (product: IProduct, currency: string) =>
    api.post("/payments", {
      products: product,
      currency: currency,
    }),
};
