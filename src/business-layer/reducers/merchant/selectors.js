import { isolateLocalState } from "./reducer";

export function getMerchant(globalState) {
  return isolateLocalState(globalState).merchant;
}

export function getMerchants(globalState) {
  return isolateLocalState(globalState).merchants;
}
export function getTransactions(globalState) {
  return isolateLocalState(globalState).transactions;
}
export function getMerchantInvoice(globalState) {
  return isolateLocalState(globalState).invoices;
}

export function getAllInvoices(globalState) {
  return isolateLocalState(globalState).allInvoices;
}

export function isLoaded(globalState) {
  return isolateLocalState(globalState).isLoaded;
}

export function isLoading(globalState) {
  return isolateLocalState(globalState).isLoading;
}

export function isMerchantLoaded(globalState) {
  return isolateLocalState(globalState).isMerchantLoaded;
}

export function isMerchantLoading(globalState) {
  return isolateLocalState(globalState).isMerchantLoading;
}

export function isCreating(globalState) {
  return isolateLocalState(globalState).isCreating;
}

export function isUpdatingMerchant(globalState) {
  return isolateLocalState(globalState).isUpdatingMerchant;
}

export function isCreatingContact(globalState) {
  return isolateLocalState(globalState).isCreatingContact;
}

export function isUpdatingContact(globalState) {
  return isolateLocalState(globalState).isUpdatingContact;
}
export function isCreatingLocation(globalState) {
  return isolateLocalState(globalState).isCreatingLocation;
}

export function isUpdatingLocation(globalState) {
  return isolateLocalState(globalState).isUpdatingLocation;
}

export function isSyncMerchant(globalState) {
  return isolateLocalState(globalState).isSyncMerchant;
}

export function isSyncLocation(globalState) {
  return isolateLocalState(globalState).isSyncLocation;
}

export function isCreatingLocationOffer(globalState) {
  return isolateLocalState(globalState).isCreatingLocationOffer;
}

export function isUpdatingLocationOffer(globalState) {
  return isolateLocalState(globalState).isUpdatingLocationOffer;
}

export function getInvoice(globalState) {
  return isolateLocalState(globalState).invoices;
}

export function isCreatingProduct(globalState) {
  return isolateLocalState(globalState).isCreatingProduct;
}

export function isUpdatingProduct(globalState) {
  return isolateLocalState(globalState).isUpdatingProduct;
}

export function isCreatingDispute(globalState) {
  return isolateLocalState(globalState).isCreatingDispute;
}

export function isCreatingAccountDetails(globalState) {
  return isolateLocalState(globalState).isCreatingAccountDetails;
}

export function isUpdatingInvoice(globalState) {
  return isolateLocalState(globalState).isUpdatingInvoice;
}

export function isUpdatingAccount(globalState) {
  return isolateLocalState(globalState).isUpdatingAccount;
}

export function isUpdatingLocationDetails(globalState) {
  return isolateLocalState(globalState).isUpdatingLocationDetails;
}

export function isCreatingLocationCuisine(globalState) {
  return isolateLocalState(globalState).isCreatingLocationCuisine;
}

export function isUpdatingLocationCuisine(globalState) {
  return isolateLocalState(globalState).isUpdatingLocationCuisine;
}
export function getRedeemTransactions(globalState) {
  return isolateLocalState(globalState).redeemTransactions;
}

export function isUpdatingRedeemTransactions(globalState) {
  return isolateLocalState(globalState).isUpdatingRedeemTransactions;
}

export function isApproveMerchant(globalState) {
  return isolateLocalState(globalState).isApproveMerchant;
}
