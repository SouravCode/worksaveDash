import { API } from "../../../../services";
import { CustomerRedeems } from "../../../../business-layer/domains";

export default async function getCustomerRedeem(id, accessToken) {
  const apiResponse = await API.Client.getCustomerRedeem(id, accessToken);

  return apiResponse ? CustomerRedeems.fromAPIModel(apiResponse.data) : null;
}
