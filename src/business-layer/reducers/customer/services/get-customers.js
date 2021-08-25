import { API } from "../../../../services";
import { Customers } from "../../../../business-layer/domains";

export default async function getCustomers(accessToken, query) {
  const apiResponse = await API.Client.getCustomers(accessToken, query);

  return apiResponse ? Customers.fromAPIModel(apiResponse.data) : null;
}
