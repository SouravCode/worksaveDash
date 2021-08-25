import { API } from "../../../../services";

export default async function updateLocationCuisine(
  { merchantId, locationId, cuisineId, priority, name },
  accessToken
) {
  const apiResponse = await API.Client.updateLocationCuisine(
    {
      merchantId,
      locationId,
      cuisineId,
      priority,
      name
    },
    accessToken
  );

  return apiResponse;
}
