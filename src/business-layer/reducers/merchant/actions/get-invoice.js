import { isLoading } from "../selectors";
import { getInvoice as getInvoiceService } from "../services";

import * as t from "./action-types";

export default function getInvoice(id, accessToken) {
  return (dispatch, getState) => {
    const nothingToDo = isLoading(getState());

    if (nothingToDo) {
      return Promise.resolve();
    }

    dispatch({ type: t.GET_INVOICES_PENDING });

    return getInvoiceService(id, accessToken).then(data =>
      dispatch({ payload: data, type: t.GET_INVOICES_SUCCESS })
    );
  };
}
