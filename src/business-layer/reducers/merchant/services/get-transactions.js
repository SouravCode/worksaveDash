import { API } from "../../../../services";
import { Transactions } from "../../../../business-layer/domains";
export default async function getTransactions(accessToken, query) {
  const apiResponse = await API.Client.getTransactions(accessToken, query);

  return apiResponse ? Transactions.fromAPIModel(apiResponse.data) : null;
}
