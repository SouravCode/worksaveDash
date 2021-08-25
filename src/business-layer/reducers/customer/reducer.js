import { cloneDeep } from "lodash";
import { REDUCER_ID } from "./_meta";
import * as t from "./actions/action-types";

export const INITIAL_STATE = {
  customer: null,
  customers: [],
  transactions: [],
  redeems: [],
  isLoaded: false,
  isLoading: false,
  isLoadingRedeem: false,
  isUpdatingCustomerRedeem: false
};

export function isolateLocalState(globalState) {
  return globalState[REDUCER_ID];
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case t.GET_CUSTOMERS_PENDING:
      return {
        ...state,
        isLoading: true
      };

    case t.GET_CUSTOMERS_SUCCESS:
      return {
        ...state,
        customers: action.payload,
        isLoaded: false,
        isLoading: false
      };

    case t.GET_CUSTOMERS_FAILURE:
      return {
        ...state,
        isLoaded: false,
        isLoading: false
      };
    case t.GET_CUSTOMER_TRANSACTION_PENDING:
      return {
        ...state,
        isLoading: true
      };

    case t.GET_CUSTOMER_TRANSACTION_SUCCESS:
      return {
        ...state,
        transactions: action.payload,
        isLoaded: true,
        isLoading: false
      };

    case t.GET_CUSTOMER_TRANSACTION_FAILURE:
      return {
        ...state,
        isLoaded: false,
        isLoading: false
      };

    case t.GET_CUSTOMER_REDEEM_PENDING:
      return {
        ...state,
        isLoading: true
      };

    case t.GET_CUSTOMER_REDEEM_SUCCESS:
      return {
        ...state,
        redeems: action.payload,
        isLoaded: true,
        isLoading: false
      };

    case t.GET_CUSTOMER_REDEEM_FAILURE:
      return {
        ...state,
        isLoaded: false,
        isLoading: false
      };

    case t.UPDATE_CUSTOMER_REDEEM_PENDING:
      return {
        ...state,
        isUpdatingCustomerRedeem: true
      };

    case t.UPDATE_CUSTOMER_REDEEM_SUCCESS: {
      if (!state.redeems) {
        return;
      }
      const { id } = action.payload;
      const redeems = cloneDeep(state.redeems);
      let updateRedeems = redeems.map(redeem => {
        if (redeem.id === id) {
          redeem = cloneDeep(action.payload.data.data);
          const updateRedeem = redeem;
          return updateRedeem;
        }
        return redeem;
      });
      //console.log(updateRedeems);
      return {
        ...state,
        redeems: updateRedeems,
        isUpdatingCustomerRedeem: false
      };
    }
    case t.UPDATE_CUSTOMER_REDEEM_FAILURE:
      return {
        ...state,
        isUpdatingCustomerRedeem: false
      };
    default:
      return state;
  }
}
