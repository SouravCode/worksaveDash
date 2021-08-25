import { API } from "../../../../services";
import { Merchants } from "../../../../business-layer/domains";

export default async function getMerchants(accessToken, query) {
  const apiResponse = await API.Client.getMerchants(accessToken, query);

  return apiResponse ? Merchants.fromAPIModel(apiResponse.data) : null;
}
