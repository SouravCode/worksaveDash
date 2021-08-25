import { API } from "../../../../services";
import { Invoices } from "../../../../business-layer/domains";

export default async function getAllInvoices(accessToken, query) {
  const apiResponse = await API.Client.getAllInvoices(accessToken, query);

  return apiResponse ? Invoices.fromAPIModel(apiResponse.data) : null;
}
