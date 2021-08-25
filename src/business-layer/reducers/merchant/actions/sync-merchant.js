import { syncMerchant as syncMerchantsService } from "../services";
import { isSyncMerchant } from "../selectors";
import * as t from "./action-types";
export default function syncMerchant(id, accessToken) {
  return (dispatch, getState) => {
    const nothingToDo = isSyncMerchant(getState());

    if (nothingToDo) {
      return Promise.resolve();
    }

    dispatch({ type: t.SYNC_MERCHANT_PENDING });

    return syncMerchantsService(id, accessToken)
      .then(data => {
        if (data.errors && data.errors.length) {
          dispatch({ payload: data, type: t.SYNC_MERCHANT_FAILURE });
        } else {
          dispatch({ payload: { data, id }, type: t.SYNC_MERCHANT_SUCCESS });
        }
      })
      .catch(err => {
        console.log("Error while SYNC MERCHANT", err);

        dispatch({ type: t.SYNC_MERCHANT_FAILURE });
      });
  };
}
