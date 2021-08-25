import { isDisputeMessageLoading } from "../selectors";
import { setDisputeMessage as getBusinessService } from "../services";

import * as t from "./action-types";

export default function setDisputeMessage(input, accessToken) {
  console.log(input);
  const referenceId = input.referenceId;
  return (dispatch, getState) => {
    const nothingToDo = isDisputeMessageLoading(getState());

    if (nothingToDo) {
      return Promise.resolve();
    }

    dispatch({ type: t.SET_DISPUTE_MESSAGE_PENDING });

    return getBusinessService(input, accessToken).then(data =>
      dispatch({
        payload: { data, referenceId },
        type: t.SET_DISPUTE_MESSAGE_SUCCESS
      })
    );
  };
}
