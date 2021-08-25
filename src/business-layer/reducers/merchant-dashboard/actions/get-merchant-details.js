import { isMerchantDetailsLoading } from "../selectors";
import { getMerchantDetails as getMerchantDetailsService } from "../services";

import * as t from "./action-types";

export default function getMerchantDetails(accessToken) {
  return (dispatch, getState) => {
    const nothingToDo = isMerchantDetailsLoading(getState());

    if (nothingToDo) {
      return Promise.resolve();
    }

    dispatch({ type: t.GET_MERCHANT_DETAILS_PENDING });

    return getMerchantDetailsService(accessToken).then(data =>
      dispatch({ payload: data, type: t.GET_MERCHANT_DETAILS_SUCCESS })
    );
  };
}
