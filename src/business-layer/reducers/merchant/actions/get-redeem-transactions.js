import { isLoading } from "../selectors";
import { getRedeemTransactions as getRedeemTransactionsService } from "../services";

import * as t from "./action-types";

export default function getRedeemTransactions(accessToken, query) {
  return (dispatch, getState) => {
    const nothingToDo = isLoading(getState());

    if (nothingToDo) {
      return Promise.resolve();
    }

    dispatch({ type: t.GET__REDEEM_TRANSACTIONS_PENDING });

    return getRedeemTransactionsService(accessToken, query).then(data =>
      dispatch({ payload: data, type: t.GET__REDEEM_TRANSACTIONS_SUCCESS })
    );
  };
}
