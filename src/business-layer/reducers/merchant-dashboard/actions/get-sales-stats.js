import { isLoading } from "../selectors";
import { getSalesStats as getBusinessService } from "../services";

import * as t from "./action-types";

export default function getSalesStats(id, input, accessToken) {
  return (dispatch, getState) => {
    const nothingToDo = isLoading(getState());

    if (nothingToDo) {
      return Promise.resolve();
    }

    dispatch({ type: t.GET_SALES_STATS_PENDING });

    return getBusinessService(id, input, accessToken).then(data =>
      dispatch({ payload: data, type: t.GET_SALES_STATS_SUCCESS })
    );
  };
}
