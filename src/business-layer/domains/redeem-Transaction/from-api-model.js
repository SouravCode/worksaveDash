import { DateTime } from "luxon";
export default function fromAPIModel(redeem) {
  const {
    id,
    redeemId,
    accountName,
    name,
    accountId,
    amount,
    createdDate,
    currentStatus,
    customerId,
    requestedDate,
    paidDate,
    referenceId,
    status
  } = redeem;

  return Object.freeze({
    id,
    redeemId,
    accountName,
    name,
    accountId,
    amount,
    createdDate,
    currentStatus,
    requestedDate,
    customerId,
    paidDate,
    referenceId,
    status
  });
}
