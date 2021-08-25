import { API } from "../../../../services";

export default async function syncLocation(
  { merchantId, locationId },
  accessToken
) {
  const apiResponse = await API.Client.syncLocation(
    {
      merchantId,
      locationId
    },
    accessToken
  );

  return apiResponse;
}
