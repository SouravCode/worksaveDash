import { API } from "../../../../services";

export default async function createLocation(
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
    merchantId
  },
  accessToken
) {
  const apiResponse = await API.Client.createLocation(
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
      merchantId
    },
    accessToken
  );

  return apiResponse;
}
