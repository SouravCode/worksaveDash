import { combineReducers } from "redux";

import * as Biz from "../../business-layer";

const busybReducers = {
  Merchant: Biz.Merchant.reducer,
  Customer: Biz.Customer.reducer,
  MerchantDashboard: Biz.MerchantDashboard.reducer
};

const APP_REDUCER = combineReducers({ ...busybReducers });

const ROOT_REDUCER = (state, action) => {
  return APP_REDUCER(state, action);
};

export default ROOT_REDUCER;
