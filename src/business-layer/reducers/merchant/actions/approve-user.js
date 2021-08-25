import { approveUser as approveUserService } from "../services";
import { isApproveMerchant } from "../selectors";
import * as t from "./action-types";
export default function approveUser(id, accessToken) {
  return (dispatch, getState) => {
    const nothingToDo = isApproveMerchant(getState());

    if (nothingToDo) {
      return Promise.resolve();
    }

    dispatch({ type: t.APPROVE_MERCHANT_PENDING });

    return approveUserService(id, accessToken)
      .then(data => {
        if (data.errors && data.errors.length) {
          dispatch({ payload: data, type: t.APPROVE_MERCHANT_FAILURE });
        } else {
          dispatch({ payload: { data, id }, type: t.APPROVE_MERCHANT_SUCCESS });
        }
      })
      .catch(err => {
        console.log("Error while APPROVE MERCHANT", err);

        dispatch({ type: t.APPROVE_MERCHANT_FAILURE });
      });
  };
}
