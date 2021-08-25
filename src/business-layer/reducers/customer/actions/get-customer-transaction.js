import { isLoading } from "../selectors";
import { getCustomerTransaction as getCustomerTransactionService } from "../services";

import * as t from "./action-types";

export default function getCustomerTransaction(id, accessToken) {
  return (dispatch, getState) => {
    const nothingToDo = isLoading(getState());

    if (nothingToDo) {
      return Promise.resolve();
    }

    dispatch({ type: t.GET_CUSTOMER_TRANSACTION_PENDING });

    return getCustomerTransactionService(id, accessToken).then(data =>
      dispatch({ payload: data, type: t.GET_CUSTOMER_TRANSACTION_SUCCESS })
    );
  };
}
