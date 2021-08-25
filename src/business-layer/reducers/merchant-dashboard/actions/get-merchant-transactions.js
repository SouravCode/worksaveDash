import { isTransactionLoading } from "../selectors";
import { getMerchantTransactions as getMerchantTransactionsService } from "../services";

import * as t from "./action-types";

export default function getMerchantTransactions(
  merchantId,
  accessToken,
  query
) {
  return (dispatch, getState) => {
    const nothingToDo = isTransactionLoading(getState());

    if (nothingToDo) {
      return Promise.resolve();
    }

    dispatch({ type: t.GET_TRANSACTIONS_PENDING });

    return getMerchantTransactionsService(merchantId, accessToken, query).then(
      data => dispatch({ payload: data, type: t.GET_TRANSACTIONS_SUCCESS })
    );
  };
}
