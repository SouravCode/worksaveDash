import { isUpdatingInvoice } from "../selectors";
import { updateInvoice as updateInvoiceService } from "../services";
import * as t from "./action-types";
export default function updateInvoice(
  { status, comment, merchantId, invoiceId },
  accessToken
) {
  return (dispatch, getState) => {
    const nothingToDo = isUpdatingInvoice(getState());

    if (nothingToDo) {
      return Promise.resolve();
    }

    dispatch({ type: t.UPDATE_INVOICE_PENDING });

    return updateInvoiceService(
      { status, comment, merchantId, invoiceId },
      accessToken
    )
      .then(data => {
        if (data.errors && data.errors.length) {
          dispatch({ payload: data, type: t.UPDATE_INVOICE_FAILURE });
        } else {
          dispatch({
            payload: { data, merchantId, invoiceId },
            type: t.UPDATE_INVOICE_SUCCESS
          });
        }
      })
      .catch(err => {
        console.log("Error while update invoice", err);

        dispatch({ type: t.UPDATE_INVOICE_FAILURE });
      });
  };
}
