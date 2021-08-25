import { isLoading } from "../selectors";
import { getMerchant as getBusinessService } from "../services";

import * as t from "./action-types";

export default function getMerchant(id) {
  return (dispatch, getState) => {
    const nothingToDo = isLoading(getState());

    if (nothingToDo) {
      return Promise.resolve();
    }

    dispatch({ type: t.GET_MERCHANT_PENDING });

    return getBusinessService(id).then(data =>
      dispatch({ payload: data, type: t.GET_MERCHANT_SUCCESS })
    );
  };
}
