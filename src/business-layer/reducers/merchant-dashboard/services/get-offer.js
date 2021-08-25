import { API } from "../../../../services";
import { Offers } from "../../../../business-layer/domains";
export default async function getOffer(merchantId, locationId, accessToken) {
  const apiResponse = await API.Client.getMerchantOffer(
    merchantId,
    locationId,
    accessToken
  );

  return apiResponse ? Offers.fromAPIModel(apiResponse.data) : null;
}
