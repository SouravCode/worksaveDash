import { isLoading } from "../selectors";
import { createInvoice as createInvoiceService } from "../services";

import * as t from "./action-types";

export default function createInvoice(
  {
    startDate,
    endDate,
    dueDate,
    invoiceNumber,
    transactions,
    merchantId,
    invoiceAmount
  },
  accessToken
) {
  return (dispatch, getState) => {
    const nothingToDo = isLoading(getState());

    if (nothingToDo) {
      return Promise.resolve();
    }

    dispatch({ type: t.CREATE_INVOICES_PENDING });

    return createInvoiceService(
      {
        startDate,
        endDate,
        dueDate,
        invoiceNumber,
        transactions,
        merchantId,
        invoiceAmount
      },
      accessToken
    )
      .then(data => {
        if (data.errors && data.errors.length) {
          dispatch({ payload: data, type: t.CREATE_INVOICES_FAILURE });
        } else {
          dispatch({
            payload: { data, merchantId },
            type: t.CREATE_INVOICES_SUCCESS
          });
        }
      })
      .catch(err => {
        console.log("Error while Create Offer", err);

        dispatch({ type: t.CREATE_INVOICES_FAILURE });
      });
  };
}
