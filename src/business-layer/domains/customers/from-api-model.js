import { Customer } from "../";

export default function fromAPIModel(customer) {
  return Object.freeze(customer.map(m => Customer.fromAPIModel(m)));
}
