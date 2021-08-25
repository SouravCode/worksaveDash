import { API } from "../../../../services";
export default async function approveUser(id, accessToken) {
  const apiResponse = await API.Client.approveMerchant(id, accessToken);

  return apiResponse;
}
