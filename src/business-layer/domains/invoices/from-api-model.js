import { Invoice } from "..";

export default function fromAPIModel(invoice) {
  return Object.freeze(invoice.map(m => Invoice.fromAPIModel(m)));
}
