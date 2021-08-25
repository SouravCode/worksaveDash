import { API } from "../../../../services";
import { Disputes } from "../../../../business-layer/domains";
export default async function getDispute(id, accessToken, query) {
  const apiResponse = await API.Client.getMerchantDisputes(
    id,
    accessToken,
    query
  );

  return apiResponse ? Disputes.fromAPIModel(apiResponse.data) : null;
}
