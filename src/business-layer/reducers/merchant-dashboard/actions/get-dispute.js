import { isDisputeLoading } from "../selectors";
import { getDispute as getBusinessService } from "../services";

import * as t from "./action-types";

export default function getDispute(id, accessToken, query) {
  return (dispatch, getState) => {
    const nothingToDo = isDisputeLoading(getState());

    if (nothingToDo) {
      return Promise.resolve();
    }

    dispatch({ type: t.GET_DISPUTE_PENDING });

    return getBusinessService(id, accessToken, query).then(data =>
      dispatch({ payload: data, type: t.GET_DISPUTE_SUCCESS })
    );
  };
}
