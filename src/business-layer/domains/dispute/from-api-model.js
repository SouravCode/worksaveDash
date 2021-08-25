import { DateTime } from "luxon";

export default function fromAPIModel(disputeTransaction) {
  const {
    id,
    cardId,
    customerId,
    transactionDate,
    transactionId,
    amount,
    cashback,
    transactionStatus,
    dispute,
    cardType,
    cardLastNumbers,
    transactionType
  } = disputeTransaction;

  return Object.freeze({
    id,
    cardId,
    customerId,
    transactionDate: DateTime.fromISO(transactionDate).toFormat(
      "dd LLL yy HH:mm"
    ),
    amount,
    transactionId,
    cashback,
    transactionStatus,
    dispute,
    cardType,
    cardLastNumbers,
    transactionType
  });
}
