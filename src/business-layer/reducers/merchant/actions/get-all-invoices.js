import { isLoading } from "../selectors";
import { getAllInvoices as getAllInvoicesService } from "../services";

import * as t from "./action-types";

export default function getAllInvoices(accessToken, query) {
  return (dispatch, getState) => {
    const nothingToDo = isLoading(getState());

    if (nothingToDo) {
      return Promise.resolve();
    }

    dispatch({ type: t.GET_ALL_INVOICE_PENDING });

    return getAllInvoicesService(accessToken, query).then(data =>
      dispatch({ payload: data, type: t.GET_ALL_INVOICE_SUCCESS })
    );
  };
}
