import { isLoading } from "../selectors";
import { getDefaultTransactions as getDefaultTransactionsService } from "../services";

import * as t from "./action-types";

export default function getDefaultTransactions(merchantId, accessToken, query) {
  return (dispatch, getState) => {
    const nothingToDo = isLoading(getState());

    if (nothingToDo) {
      return Promise.resolve();
    }

    dispatch({ type: t.GET_TRANSACTIONS_PENDING });

    return getDefaultTransactionsService(merchantId, accessToken, query).then(
      data => dispatch({ payload: data, type: t.GET_TRANSACTIONS_SUCCESS })
    );
  };
}
