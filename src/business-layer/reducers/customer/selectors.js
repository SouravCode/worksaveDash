import { isolateLocalState } from "./reducer";

export function getCustomers(globalState) {
  return isolateLocalState(globalState).customers;
}

export function getCustomerTransaction(globalState) {
  return isolateLocalState(globalState).transactions;
}

export function isLoaded(globalState) {
  return isolateLocalState(globalState).isLoaded;
}

export function isLoading(globalState) {
  return isolateLocalState(globalState).isLoading;
}

export function getCustomerRedeem(globalState) {
  return isolateLocalState(globalState).redeems;
}
export function isUpdatingCustomerRedeem(globalState) {
  return isolateLocalState(globalState).isUpdatingCustomerRedeem;
}
