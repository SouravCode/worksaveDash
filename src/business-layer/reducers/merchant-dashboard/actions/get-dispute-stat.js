import { isDisputeStatLoading } from "../selectors";
import { getDisputeStat as getBusinessService } from "../services";

import * as t from "./action-types";

export default function getDisputeStat(id, query, accessToken) {
  return (dispatch, getState) => {
    const nothingToDo = isDisputeStatLoading(getState());

    if (nothingToDo) {
      return Promise.resolve();
    }

    dispatch({ type: t.GET_DISPUTE_STAT_PENDING });

    return getBusinessService(id, query, accessToken).then(data =>
      dispatch({ payload: data, type: t.GET_DISPUTE_STAT_SUCCESS })
    );
  };
}
