import { isReportLoading } from "../selectors";
import { getSalesReport as getBusinessService } from "../services";

import * as t from "./action-types";

export default function getSalesReport(id, input, accessToken) {
  return (dispatch, getState) => {
    const nothingToDo = isReportLoading(getState());

    if (nothingToDo) {
      return Promise.resolve();
    }

    dispatch({ type: t.GET_SALES_REPORT_PENDING });

    return getBusinessService(id, input, accessToken).then(data =>
      dispatch({ payload: data, type: t.GET_SALES_REPORT_SUCCESS })
    );
  };
}
