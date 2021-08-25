import { API } from "../../../../services";
import { Transactions } from "../../../domains";
export default async function getDefaultTransactions(
  merchantId,
  accessToken,
  query
) {
  const apiResponse = await API.Client.getDefaultTransactions(
    merchantId,
    accessToken,
    query
  );
  return apiResponse ? Transactions.fromAPIModel(apiResponse.data) : null;
}
