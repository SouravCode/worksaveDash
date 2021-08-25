import { cloneDeep } from "lodash";
import { REDUCER_ID } from "./_meta";
import * as t from "./actions/action-types";

export const INITIAL_STATE = {
  salesReport: [],
  salesStats: [],
  invoice: [],
  dispute: [],
  offers: [],
  transactions: [],
  merchantDetails: {},
  disputeStat: {},
  disputeMessage: {},
  isLoaded: false,
  isLoading: false,
  isReportLoaded: false,
  isReportLoading: false,
  isOfferLoaded: false,
  isOfferLoading: false,
  isInvoiceLoaded: false,
  isInvoiceLoading: false,
  isTransactionLoading: false,
  isMerchantDetailsLoading: false,
  isDisputeLoaded: false,
  isDisputeLoading: false,
  isDisputeStatLoaded: false,
  isDisputeStatLoading: false,
  isDisputeMessageLoaded: false,
  isDisputeMessageLoading: false
};

export function isolateLocalState(globalState) {
  return globalState[REDUCER_ID];
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case t.GET_SALES_REPORT_PENDING:
      return {
        ...state,
        isReportLoading: true
      };

    case t.GET_SALES_REPORT_SUCCESS:
      return {
        ...state,
        salesReport: action.payload,
        isReportLoaded: true,
        isReportLoading: false
      };

    case t.GET_SALES_REPORT_FAILURE:
      return {
        ...state,
        isReportLoaded: false,
        isReportLoading: false
      };

    case t.GET_SALES_STATS_PENDING:
      return {
        ...state,
        isLoading: true
      };

    case t.GET_SALES_STATS_SUCCESS:
      return {
        ...state,
        salesStats: action.payload,
        isLoaded: true,
        isLoading: false
      };

    case t.GET_SALES_STATS_FAILURE:
      return {
        ...state,
        isLoaded: false,
        isLoading: false
      };

    case t.GET_INVOICE_PENDING:
      return {
        ...state,
        isInvoiceLoading: true
      };

    case t.GET_INVOICE_SUCCESS:
      return {
        ...state,
        invoice: action.payload,
        isInvoiceLoaded: true,
        isInvoiceLoading: false
      };

    case t.GET_INVOICE_FAILURE:
      return {
        ...state,
        isInvoiceLoaded: false,
        isInvoiceLoading: false
      };
    case t.GET_DISPUTE_PENDING:
      return {
        ...state,
        isDisputeLoading: true
      };
    case t.GET_DISPUTE_SUCCESS:
      return {
        ...state,
        dispute: action.payload,
        isDisputeLoaded: true,
        isDisputeLoading: false
      };

    case t.GET_DISPUTE_FAILURE:
      return {
        ...state,
        isDisputeLoaded: false,
        isDisputeLoading: false
      };
    case t.GET_DISPUTE_STAT_PENDING:
      return {
        ...state,
        isDisputeStatLoading: true
      };
    case t.GET_DISPUTE_STAT_SUCCESS:
      return {
        ...state,
        disputeStat: action.payload,
        isDisputeStatLoaded: true,
        isDisputeStatLoading: false
      };

    case t.GET_DISPUTE_STAT_FAILURE:
      return {
        ...state,
        isDisputeStatLoaded: false,
        isDisputeStatLoading: false
      };
    case t.SET_DISPUTE_MESSAGE_PENDING:
      return {
        ...state,
        isDisputeMessageLoading: true
      };
    case t.SET_DISPUTE_MESSAGE_SUCCESS: {
      if (!state.dispute) {
        return;
      }
      const { referenceId } = action.payload;
      const dispute = cloneDeep(state.dispute);

      dispute.map(disput => {
        if (disput.id === referenceId) {
          disput.dispute.push(action.payload.data.data);
          const updatedDispute = disput;

          return updatedDispute;
        }

        return disput;
      });
      return {
        ...state,
        dispute,
        isDisputeMessageLoading: false
      };
    }
    case t.SET_DISPUTE_MESSAGE_FAILURE:
      return {
        ...state,
        isDisputeMessageLoaded: false,
        isDisputeMessageLoading: false
      };

    case t.GET_OFFER_PENDING:
      return {
        ...state,
        isOfferLoading: true
      };

    case t.GET_OFFER_SUCCESS:
      return {
        ...state,
        offers: action.payload,
        isOfferLoaded: true,
        isOfferLoading: false
      };

    case t.GET_OFFER_FAILURE:
      return {
        ...state,
        isOfferLoaded: false,
        isOfferLoading: false
      };

    case t.GET_TRANSACTIONS_PENDING:
      return {
        ...state,
        isTransactionLoading: true
      };

    case t.GET_TRANSACTIONS_SUCCESS: {
      return {
        ...state,
        transactions: action.payload,
        isTransactionLoading: false,
        isTransactionLoading: false
      };
    }
    case t.GET_TRANSACTIONS_FAILURE:
      return {
        ...state,
        isTransactionLoading: false,
        isTransactionLoading: false
      };

    case t.GET_MERCHANT_DETAILS_PENDING:
      return {
        ...state,
        isMerchantDetailsLoading: true
      };

    case t.GET_MERCHANT_DETAILS_SUCCESS: {
      return {
        ...state,
        merchantDetails: action.payload,
        isMerchantDetailsLoading: false
      };
    }
    case t.GET_MERCHANT_DETAILS_FAILURE:
      return {
        ...state,
        isMerchantDetailsLoading: false
      };

    default:
      return state;
  }
}
