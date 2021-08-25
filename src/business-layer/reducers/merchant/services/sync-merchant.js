import { API } from "../../../../services";
export default async function syncMerchant(id, accessToken) {
  const apiResponse = await API.Client.syncMerchant(id, accessToken);

  return apiResponse;
}
