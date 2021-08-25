import { API } from "../../../../services";

export default async function updateLocation(
  {
    city,
    country,
    currency,
    latitude,
    line1,
    line2,
    longitude,
    state,
    zip,
    merchantId,
    locationId
  },
  accessToken
) {
  const apiResponse = await API.Client.updateLocation(
    {
      city,
      country,
      currency,
      latitude,
      line1,
      line2,
      longitude,
      state,
      zip,
      merchantId,
      locationId
    },
    accessToken
  );

  return apiResponse;
}
