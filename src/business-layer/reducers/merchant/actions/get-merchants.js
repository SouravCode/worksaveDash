import { isLoading } from "../selectors";
import { getMerchants as getMerchantsService } from "../services";
import * as t from "./action-types";

export default function getMerchants(accessToken, query) {
  return (dispatch, getState) => {
    const nothingToDo = isLoading(getState());

    if (nothingToDo) {
      return Promise.resolve();
    }

    dispatch({ type: t.GET_MERCHANTS_PENDING });

    return getMerchantsService(accessToken, query).then(data =>
      dispatch({ payload: data, type: t.GET_MERCHANTS_SUCCESS })
    );
  };
}
