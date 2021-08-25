import { API } from "../../../../services";
import { Merchant } from "../../../domains";
export default async function getMerchantDetail(accessToken) {
  const apiResponse = await API.Client.getMerchantDetail(accessToken);
  return apiResponse ? Merchant.fromAPIModel(apiResponse.data[0]) : null;
}
