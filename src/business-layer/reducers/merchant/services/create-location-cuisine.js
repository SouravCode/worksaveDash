import { API } from "../../../../services";

export default async function createLocationCuisine(
  { merchantId, locationId, priority, name },
  accessToken
) {
  const apiResponse = await API.Client.createLocationCuisine(
    {
      merchantId,
      locationId,
      priority,
      name
    },
    accessToken
  );

  return apiResponse;
}
