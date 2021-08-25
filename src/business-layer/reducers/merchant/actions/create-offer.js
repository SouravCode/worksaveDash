import { createOffer as createOfferService } from "../services";
import { isCreatingLocationOffer } from "../selectors";
import * as t from "./action-types";

export default function createOffer(
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
  return (dispatch, getState) => {
    const nothingToDo = isCreatingLocationOffer(getState());

    if (nothingToDo) {
      return Promise.resolve();
    }

    dispatch({ type: t.CREATE_LOCATION_OFFER_PENDING });

    return createOfferService(
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
    )
      .then(data => {
        if (data.errors && data.errors.length) {
          dispatch({ payload: data, type: t.CREATE_LOCATION_OFFER_FAILURE });
        } else {
          dispatch({
            payload: { data, merchantId },
            type: t.CREATE_LOCATION_OFFER_SUCCESS
          });
        }
      })
      .catch(err => {
        console.log("Error while Create Offer", err);

        dispatch({ type: t.CREATE_LOCATION_OFFER_FAILURE });
      });
  };
}
