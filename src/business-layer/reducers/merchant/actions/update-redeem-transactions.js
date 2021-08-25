import { isUpdatingRedeemTransactions } from "../selectors";
import { updateRedeemTransactions as updateRedeemTransactionsService } from "../services";
import * as t from "./action-types";
export default function updateRedeemTransactions(
  { status, amount, id },
  accessToken
) {
  return (dispatch, getState) => {
    const nothingToDo = isUpdatingRedeemTransactions(getState());

    if (nothingToDo) {
      return Promise.resolve();
    }

    dispatch({ type: t.UPDATE_REDEEM_TRANSACTIONS_PENDING });

    return updateRedeemTransactionsService({ status, amount, id }, accessToken)
      .then(data => {
        if (data.errors && data.errors.length) {
          dispatch({
            payload: data,
            type: t.UPDATE_REDEEM_TRANSACTIONS_FAILURE
          });
        } else {
          dispatch({
            payload: { data, id },
            type: t.UPDATE_REDEEM_TRANSACTIONS_SUCCESS
          });
        }
      })
      .catch(err => {
        console.log("Error while Updating Redeem", err);

        dispatch({ type: t.UPDATE_REDEEM_TRANSACTIONS_FAILURE });
      });
  };
}
