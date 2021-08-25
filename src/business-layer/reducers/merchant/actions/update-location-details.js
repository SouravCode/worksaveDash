import { isUpdatingLocationDetails } from "../selectors";
import { updateLocationDetails as updateLocationDetailsService } from "../services";
import * as t from "./action-types";
export default function updateLocationDetails(
  { merchantId, locationId, CardSchemes, workingTimings, contactDetails },
  accessToken
) {
  return (dispatch, getState) => {
    const nothingToDo = isUpdatingLocationDetails(getState());

    if (nothingToDo) {
      return Promise.resolve();
    }

    dispatch({ type: t.UPDATE_LOCATION_DETAILS_PENDING });

    return updateLocationDetailsService(
      { merchantId, locationId, CardSchemes, workingTimings, contactDetails },
      accessToken
    )
      .then(data => {
        if (data.errors && data.errors.length) {
          dispatch({ payload: data, type: t.UPDATE_LOCATION_DETAILS_FAILURE });
        } else {
          dispatch({
            payload: { data, merchantId, locationId },
            type: t.UPDATE_LOCATION_DETAILS_SUCCESS
          });
        }
      })
      .catch(err => {
        console.log("Error while Updating LocationDetails", err);

        dispatch({ type: t.UPDATE_LOCATION_DETAILS_FAILURE });
      });
  };
}
