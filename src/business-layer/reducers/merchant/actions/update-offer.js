import { updateOffer as updateOfferService } from "../services";
import { isCreatingLocationOffer } from "../selectors";
import * as t from "./action-types";

export default function updateOffer(
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
  return (dispatch, getState) => {
    const nothingToDo = isCreatingLocationOffer(getState());

    if (nothingToDo) {
      return Promise.resolve();
    }

    dispatch({ type: t.UPDATE_LOCATION_OFFER_PENDING });

    return updateOfferService(
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
    )
      .then(data => {
        if (data.errors && data.errors.length) {
          dispatch({ payload: data, type: t.UPDATE_LOCATION_OFFER_FAILURE });
        } else {
          dispatch({
            payload: { data, merchantId, offerId, isPrimary },
            type: t.UPDATE_LOCATION_OFFER_SUCCESS
          });
        }
      })
      .catch(err => {
        console.log("Error while Update Offer", err);

        dispatch({ type: t.UPDATE_LOCATION_OFFER_FAILURE });
      });
  };
}
