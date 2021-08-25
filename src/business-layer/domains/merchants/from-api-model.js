import { Merchant } from "../";

export default function fromAPIModel(merchants) {
  return Object.freeze(merchants.map(m => Merchant.fromAPIModel(m)));
}
