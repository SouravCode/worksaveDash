import { API } from "../../../../services";
import { salesReports } from "../../../../business-layer/domains";
export default async function getSalesReport(id, salesInput, accessToken) {
  const apiResponse = await API.Client.getSalesReport(
    id,
    salesInput,
    accessToken
  );

  return apiResponse ? salesReports.fromAPIModel(apiResponse.data) : null;
}
