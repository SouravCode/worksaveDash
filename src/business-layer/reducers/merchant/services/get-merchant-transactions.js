import { API } from "../../../../services";
import { Transactions } from "../../../domains";
export default async function getMerchantTransactions(
  merchantId,
  accessToken,
  query
) {
  const apiResponse = await API.Client.getMerchantTransactions(
    merchantId,
    accessToken,
    query
  );
  return apiResponse ? Transactions.fromAPIModel(apiResponse.data) : null;
}
