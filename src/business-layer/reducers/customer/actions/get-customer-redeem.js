import { isLoading } from "../selectors";
import { getCustomerRedeem as getCustomerRedeemService } from "../services";

import * as t from "./action-types";

export default function getCustomerRedeem(id, accessToken) {
  return (dispatch, getState) => {
    const nothingToDo = isLoading(getState());

    if (nothingToDo) {
      return Promise.resolve();
    }

    dispatch({ type: t.GET_CUSTOMER_REDEEM_PENDING });

    return getCustomerRedeemService(id, accessToken).then(data =>
      dispatch({ payload: data, type: t.GET_CUSTOMER_REDEEM_SUCCESS })
    );
  };
}
