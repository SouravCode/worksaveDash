import { API } from "../../../../services";

export default async function updateOffer(
  {
    merchantId,
    locationId,
    prevOfferId,
    offerId,
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
  const apiResponse = await API.Client.updateOffer(
    {
      merchantId,
      locationId,
      prevOfferId,
      offerId,
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
