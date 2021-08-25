import { API } from "../../../../services";

export default async function updateLocationDetails(
  { merchantId, locationId, CardSchemes, workingTimings, contactDetails },
  accessToken
) {
  const apiResponse = await API.Client.updateLocationDetails(
    { merchantId, locationId, CardSchemes, workingTimings, contactDetails },
    accessToken
  );

  return apiResponse;
}
