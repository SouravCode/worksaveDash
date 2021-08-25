import { createLocationCuisine as createLocationCuisineService } from "../services";
import { isCreatingLocationCuisine } from "../selectors";
import * as t from "./action-types";

export default function createLocationCuisine(
  { merchantId, locationId, priority, name },
  accessToken
) {
  return (dispatch, getState) => {
    const nothingToDo = isCreatingLocationCuisine(getState());

    if (nothingToDo) {
      return Promise.resolve();
    }

    dispatch({ type: t.CREATE_LOCATION_CUISINE_PENDING });

    return createLocationCuisineService(
      {
        merchantId,
        locationId,
        priority,
        name
      },
      accessToken
    )
      .then(data => {
        if (data.errors && data.errors.length) {
          dispatch({ payload: data, type: t.CREATE_LOCATION_CUISINE_FAILURE });
        } else {
          dispatch({
            payload: { data, merchantId },
            type: t.CREATE_LOCATION_CUISINE_SUCCESS
          });
        }
      })
      .catch(err => {
        console.log("Error while Create location cuisine", err);

        dispatch({ type: t.CREATE_LOCATION_CUISINE_FAILURE });
      });
  };
}
