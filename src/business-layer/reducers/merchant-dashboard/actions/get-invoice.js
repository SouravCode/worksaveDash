import { isInvoiceLoading } from "../selectors";
import { getInvoice as getBusinessService } from "../services";

import * as t from "./action-types";

export default function getInvoice(id, accessToken) {
  return (dispatch, getState) => {
    const nothingToDo = isInvoiceLoading(getState());

    if (nothingToDo) {
      return Promise.resolve();
    }

    dispatch({ type: t.GET_INVOICE_PENDING });

    return getBusinessService(id, accessToken).then(data =>
      dispatch({ payload: data, type: t.GET_INVOICE_SUCCESS })
    );
  };
}
