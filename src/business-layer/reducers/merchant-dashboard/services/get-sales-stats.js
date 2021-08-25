import { API } from "../../../../services";
import { salesStats } from "../../../../business-layer/domains";

export default async function getSalesStats(id, salesInput, accessToken) {
  const apiResponse = await API.Client.getStats(id, salesInput, accessToken);

  return apiResponse && apiResponse.data.length > 0
    ? salesStats.fromAPIModel(apiResponse.data)
    : null;
}
