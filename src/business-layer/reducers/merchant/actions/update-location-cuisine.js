import { updateLocationCuisine as updateLocationCuisineService } from "../services";
import { isUpdatingLocationCuisine } from "../selectors";
import * as t from "./action-types";

export default function updateLocationCuisine(
  { merchantId, locationId, cuisineId, priority, name },
  accessToken
) {
  return (dispatch, getState) => {
    const nothingToDo = isUpdatingLocationCuisine(getState());

    if (nothingToDo) {
      return Promise.resolve();
    }

    dispatch({ type: t.UPDATE_LOCATION_CUISINE_PENDING });

    return updateLocationCuisineService(
      {
        merchantId,
        locationId,
        cuisineId,
        priority,
        name
      },
      accessToken
    )
      .then(data => {
        if (data.errors && data.errors.length) {
          dispatch({ payload: data, type: t.UPDATE_LOCATION_CUISINE_FAILURE });
        } else {
          dispatch({
            payload: { data, merchantId, cuisineId },
            type: t.UPDATE_LOCATION_CUISINE_SUCCESS
          });
        }
      })
      .catch(err => {
        console.log("Error while Update location cuisine", err);

        dispatch({ type: t.UPDATE_LOCATION_CUISINE_FAILURE });
      });
  };
}
