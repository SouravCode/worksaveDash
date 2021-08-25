import { createDispute as createDisputeService } from "../services";
import { isCreatingDispute } from "../selectors";
import * as t from "./action-types";

export default function createDispute(
  { comment, disputeId, status, createdBy, referenceId, type },
  accessToken
) {
  return (dispatch, getState) => {
    const nothingToDo = isCreatingDispute(getState());

    if (nothingToDo) {
      return Promise.resolve();
    }

    dispatch({ type: t.CREATE_DISPUTE_PENDING });

    return createDisputeService(
      {
        comment,
        disputeId,
        status,
        createdBy,
        referenceId,
        type
      },
      accessToken
    )
      .then(data => {
        if (data.errors && data.errors.length) {
          dispatch({ payload: data, type: t.CREATE_DISPUTE_FAILURE });
        } else {
          dispatch({
            payload: { data, referenceId },
            type: t.CREATE_DISPUTE_SUCCESS
          });
        }
      })
      .catch(err => {
        console.log("Error while Create dispute", err);

        dispatch({ type: t.CREATE_DISPUTE_FAILURE });
      });
  };
}
