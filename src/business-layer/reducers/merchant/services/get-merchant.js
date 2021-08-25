import { API } from "../../../../services";
import { Merchant } from "../../../../business-layer";

export default async function getMerchant(id, accessToken) {
  const apiResponse = await API.Client.getMerchant(id, accessToken);

  return Merchant.fromAPIModel(apiResponse.merchant);
}
