import { isOfferLoading } from "../selectors";
import { getOffer as getBusinessService } from "../services";

import * as t from "./action-types";

export default function getOffer(merchantId, locationId, accessToken) {
  return (dispatch, getState) => {
    const nothingToDo = isOfferLoading(getState());

    if (nothingToDo) {
      return Promise.resolve();
    }

    dispatch({ type: t.GET_OFFER_PENDING });

    return getBusinessService(merchantId, locationId, accessToken).then(data =>
      dispatch({ payload: data, type: t.GET_OFFER_SUCCESS })
    );
  };
}
