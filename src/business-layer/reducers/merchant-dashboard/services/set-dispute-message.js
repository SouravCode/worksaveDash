import { API } from "../../../../services";

export default async function setDisputeMessage(input, accessToken) {
  const apiResponse = await API.Client.setDisputeMessage(input, accessToken);

  return apiResponse;
}
