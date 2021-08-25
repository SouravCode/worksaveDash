import { isLoading } from "../selectors";
import { getTransactions as getTransactionsService } from "../services";

import * as t from "./action-types";

export default function getTransactions(accessToken, query) {
  return (dispatch, getState) => {
    const nothingToDo = isLoading(getState());

    if (nothingToDo) {
      return Promise.resolve();
    }

    dispatch({ type: t.GET_TRANSACTIONS_PENDING });

    return getTransactionsService(accessToken, query).then(data =>
      dispatch({ payload: data, type: t.GET_TRANSACTIONS_SUCCESS })
    );
  };
}
