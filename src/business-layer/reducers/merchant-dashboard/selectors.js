import { isolateLocalState } from "./reducer";

export function getSalesReport(globalState) {
  return isolateLocalState(globalState).salesReport;
}
export function getSalesStats(globalState) {
  return isolateLocalState(globalState).salesStats;
}
export function getOffer(globalState) {
  return isolateLocalState(globalState).offers;
}
export function getDispute(globalState) {
  return isolateLocalState(globalState).dispute;
}
export function getDisputeStat(globalState) {
  return isolateLocalState(globalState).disputeStat;
}
export function getInvoice(globalState) {
  return isolateLocalState(globalState).invoice;
}
export function isLoaded(globalState) {
  return isolateLocalState(globalState).isLoaded;
}

export function isLoading(globalState) {
  return isolateLocalState(globalState).isLoading;
}
export function isReportLoaded(globalState) {
  return isolateLocalState(globalState).isReportLoaded;
}

export function isReportLoading(globalState) {
  return isolateLocalState(globalState).isReportLoading;
}

export function isInoviceLoaded(globalState) {
  return isolateLocalState(globalState).isInvoiceLoaded;
}

export function isInvoiceLoading(globalState) {
  return isolateLocalState(globalState).isInvoiceLoading;
}

export function isDisputeLoaded(globalState) {
  return isolateLocalState(globalState).isDisputeLoaded;
}

export function isDisputeLoading(globalState) {
  return isolateLocalState(globalState).isDisputeLoading;
}

export function isDisputeStatLoaded(globalState) {
  return isolateLocalState(globalState).isDisputeStatLoaded;
}

export function isDisputeStatLoading(globalState) {
  return isolateLocalState(globalState).isDisputeStatLoading;
}

export function isDisputeMessageLoaded(globalState) {
  return isolateLocalState(globalState).isDisputeMessageLoaded;
}

export function isDisputeMessageLoading(globalState) {
  return isolateLocalState(globalState).isDisputeMessageLoading;
}

export function setDisputeMessage(globalState) {
  return isolateLocalState(globalState).dispute;
}

export function isOfferLoaded(globalState) {
  return isolateLocalState(globalState).isOfferLoaded;
}

export function isOfferLoading(globalState) {
  return isolateLocalState(globalState).isOfferLoading;
}

export function getTransactions(globalState) {
  return isolateLocalState(globalState).transactions;
}

export function isTransactionLoading(globalState) {
  return isolateLocalState(globalState).isTransactionLoading;
}

export function getMerchantDetails(globalState) {
  return isolateLocalState(globalState).merchantDetails;
}

export function isMerchantDetailsLoading(globalState) {
  return isolateLocalState(globalState).isMerchantDetailsLoading;
}
