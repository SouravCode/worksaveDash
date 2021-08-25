import { isUpdatingCustomerRedeem } from "../selectors";
import { updateCustomerRedeem as updateCustomerRedeemService } from "../services";
import * as t from "./action-types";
export default function updateCustomerRedeem(
  { status, amount, id },
  accessToken
) {
  return (dispatch, getState) => {
    const nothingToDo = isUpdatingCustomerRedeem(getState());

    if (nothingToDo) {
      return Promise.resolve();
    }

    dispatch({ type: t.UPDATE_CUSTOMER_REDEEM_PENDING });

    return updateCustomerRedeemService({ status, amount, id }, accessToken)
      .then(data => {
        if (data.errors && data.errors.length) {
          dispatch({ payload: data, type: t.UPDATE_CUSTOMER_REDEEM_FAILURE });
        } else {
          dispatch({
            payload: { data, id },
            type: t.UPDATE_CUSTOMER_REDEEM_SUCCESS
          });
        }
      })
      .catch(err => {
        console.log("Error while Updating Redeem", err);

        dispatch({ type: t.UPDATE_CUSTOMER_REDEEM_FAILURE });
      });
  };
}
