import { API } from "../../../../services";
import { DisputeStat } from "../../../domains";
export default async function getDisputeStat(id, query, accessToken) {
  const apiResponse = await API.Client.getMerchantDisputeStat(
    id,
    query,
    accessToken
  );

  return apiResponse && apiResponse.data && apiResponse.data.length > 0
    ? DisputeStat.fromAPIModel(apiResponse.data[0])
    : null;
}
