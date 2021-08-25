import { Product } from "..";

export default function fromAPIModel(products) {
  if (!products) {
    return Object.freeze([]);
  }
  return Object.freeze(products.map(a => Product.fromAPIModel(a)));
}
