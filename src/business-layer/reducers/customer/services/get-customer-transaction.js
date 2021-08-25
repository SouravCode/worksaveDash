import { API } from "../../../../services";
import { CustomerTransactions } from "../../../../business-layer/domains";

export default async function getCustomerTransaction(id, accessToken) {
  const apiResponse = await API.Client.getCustomerTransaction(id, accessToken);

  return CustomerTransactions.fromAPIModel(apiResponse.data);
}
