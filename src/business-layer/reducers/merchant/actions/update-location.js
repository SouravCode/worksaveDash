import { updateLocation as updateLocationService } from "../services";
import { isCreatingLocation } from "../selectors";
import * as t from "./action-types";
export default function updateLocation(
  {
    city,
    country,
    currency,
    latitude,
    line1,
    line2,
    longitude,
    state,
    zip,
    merchantId,
    locationId
  },
  accessToken
) {
  return (dispatch, getState) => {
    const nothingToDo = isCreatingLocation(getState());

    if (nothingToDo) {
      return Promise.resolve();
    }

    dispatch({ type: t.UPDATE_LOCATION_PENDING });

    return updateLocationService(
      {
        city,
        country,
        currency,
        latitude,
        line1,
        line2,
        longitude,
        state,
        zip,
        merchantId,
        locationId
      },
      accessToken
    )
      .then(data => {
        if (data.errors && data.errors.length) {
          dispatch({ payload: data, type: t.UPDATE_LOCATION_FAILURE });
        } else {
          dispatch({
            payload: { data, merchantId },
            type: t.UPDATE_LOCATION_SUCCESS
          });
        }
      })
      .catch(err => {
        console.log("Error while Updating LOCATION", err);

        dispatch({ type: t.UPDATE_LOCATION_FAILURE });
      });
  };
}
