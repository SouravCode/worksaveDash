import { API } from "../../../../services";
import { MerchantInvoices } from "../../../../business-layer/domains";

export default async function getMerchantInvoice(id, accessToken, query) {
  const apiResponse = await API.Client.getMerchantInvoice(
    id,
    accessToken,
    query
  );

  return apiResponse ? MerchantInvoices.fromAPIModel(apiResponse.data) : null;
}
