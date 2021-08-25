import { createLocation as createLocationService } from "../services";
import { isCreatingLocation } from "../selectors";
import * as t from "./action-types";
export default function createLocation(
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
    merchantId
  },
  accessToken
) {
  return (dispatch, getState) => {
    const nothingToDo = isCreatingLocation(getState());

    if (nothingToDo) {
      return Promise.resolve();
    }

    dispatch({ type: t.CREATE_LOCATION_PENDING });

    return createLocationService(
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
        merchantId
      },
      accessToken
    )
      .then(data => {
        if (data.errors && data.errors.length) {
          dispatch({ payload: data, type: t.CREATE_LOCATION_FAILURE });
        } else {
          dispatch({
            payload: { data, merchantId },
            type: t.CREATE_LOCATION_SUCCESS
          });
        }
      })
      .catch(err => {
        console.log("Error while Create LOCATION", err);

        dispatch({ type: t.CREATE_LOCATION_FAILURE });
      });
  };
}
