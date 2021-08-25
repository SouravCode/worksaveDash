import { syncLocation as syncLocationService } from "../services";
import { isSyncLocation } from "../selectors";
import * as t from "./action-types";
export default function syncLocation({ merchantId, locationId }, accessToken) {
  return (dispatch, getState) => {
    const nothingToDo = isSyncLocation(getState());

    if (nothingToDo) {
      return Promise.resolve();
    }

    dispatch({ type: t.SYNC_LOCATION_PENDING });

    return syncLocationService({ merchantId, locationId }, accessToken)
      .then(data => {
        if (data.errors && data.errors.length) {
          dispatch({ payload: data, type: t.SYNC_LOCATION_FAILURE });
        } else {
          dispatch({
            payload: { data, merchantId },
            type: t.SYNC_LOCATION_SUCCESS
          });
        }
      })
      .catch(err => {
        console.log("Error while SYNC LOCATION", err);

        dispatch({ type: t.SYNC_LOCATION_FAILURE });
      });
  };
}
