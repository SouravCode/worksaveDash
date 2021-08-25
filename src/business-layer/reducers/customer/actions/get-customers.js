import { isLoading } from "../selectors";
import { getCustomers as getCustomersService } from "../services";

import * as t from "./action-types";

export default function getCustomers(accessToken, query) {
  return (dispatch, getState) => {
    const nothingToDo = isLoading(getState());

    if (nothingToDo) {
      return Promise.resolve();
    }

    dispatch({ type: t.GET_CUSTOMERS_PENDING });

    return getCustomersService(accessToken, query).then(data =>
      dispatch({ payload: data, type: t.GET_CUSTOMERS_SUCCESS })
    );
  };
}
