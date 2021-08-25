import { isLoading } from "../selectors";
import { getMerchantInvoice as getMerchantInvoiceService } from "../services";

import * as t from "./action-types";

export default function getMerchantInvoice(id, accessToken, query) {
  return (dispatch, getState) => {
    const nothingToDo = isLoading(getState());

    if (nothingToDo) {
      return Promise.resolve();
    }

    dispatch({ type: t.GET_MERCHANT_INVOICE_PENDING });

    return getMerchantInvoiceService(id, accessToken, query).then(data =>
      dispatch({ payload: data, type: t.GET_MERCHANT_INVOICE_SUCCESS })
    );
  };
}
