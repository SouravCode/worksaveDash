import { API } from "../../../../services";
import { Invoices } from "../../../domains";

export default async function getInvoice(id, accessToken) {
  const apiResponse = await API.Client.getInvoice(id, accessToken);

  return apiResponse ? Invoices.fromAPIModel(apiResponse.data) : null;
}
