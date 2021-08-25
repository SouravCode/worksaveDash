import { MerchantInvoice } from "../";

export default function fromAPIModel(invoices) {
  return Object.freeze(invoices.map(m => MerchantInvoice.fromAPIModel(m)));
}
