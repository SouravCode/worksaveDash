import { API } from "../../../../services";

export default async function createOffer(
  {
    merchantId,
    locationId,
    prevOfferId,
    offerType,
    status,
    offerCategory,
    offerValue,
    woveValue,
    offerLimitValue,
    startDate,
    endDate,
    isPrimary
  },
  accessToken
) {
  const apiResponse = await API.Client.createOffer(
    {
      merchantId,
      locationId,
      prevOfferId,
      offerType,
      status,
      offerCategory,
      offerValue,
      woveValue,
      offerLimitValue,
      startDate,
      endDate,
      isPrimary
    },
    accessToken
  );

  return apiResponse;
}
