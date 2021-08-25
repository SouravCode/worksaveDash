import { API } from "../../../../services";
import { Invoices } from "../../../../business-layer/domains";
export default async function getInvoice(id, accessToken) {
  const apiResponse = await API.Client.getMerchantInvoice(id, accessToken);

  return apiResponse ? Invoices.fromAPIModel(apiResponse.data) : null;
}
