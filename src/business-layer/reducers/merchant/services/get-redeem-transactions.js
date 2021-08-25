import { API } from "../../../../services";
import { RedeemTransactions } from "../../../../business-layer/domains";

export default async function getRedeemTransactions(accessToken, query) {
  const apiResponse = await API.Client.getRedeemTransactions(
    accessToken,
    query
  );

  return apiResponse ? RedeemTransactions.fromAPIModel(apiResponse.data) : null;
}
