import { isUpdatingInvoice } from "../selectors";
import { paymentInitiate as paymentInitiateService } from "../services";
import * as t from "./action-types";
export default function paymentInitiate(
  accessToken,
  { merchantObjId, remotePaymentAccountId, amount, invoiceId }
) {
  return (dispatch, getState) => {
    const nothingToDo = isUpdatingInvoice(getState());

    if (nothingToDo) {
      return Promise.resolve();
    }

    dispatch({ type: t.UPDATE_INVOICE_PENDING });

    return paymentInitiateService(accessToken, {
      merchantObjId,
      remotePaymentAccountId,
      amount,
      invoiceId
    })
      .then(data => {
        if (data.errors && data.errors.length) {
          dispatch({ payload: data, type: t.UPDATE_INVOICE_FAILURE });
        } else {
          dispatch({
            payload: { data, merchantObjId, invoiceId },
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
