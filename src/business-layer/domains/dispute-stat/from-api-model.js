import { DateTime } from "luxon";

export default function fromAPIModel(disputeTransaction) {
  const {
    closedDisputes,
    closedSalesDispute,
    closedCashBackDispute,
    openDisputes,
    openSalesDispute,
    openCashBackDispute
  } = disputeTransaction;

  return Object.freeze({
    closedDisputes,
    closedSalesDispute,
    closedCashBackDispute,
    openDisputes,
    openSalesDispute,
    openCashBackDispute
  });
}
