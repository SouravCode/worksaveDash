import { DateTime } from "luxon";

export default function fromAPIModel(transaction) {
  const {
    id,
    accountId,
    amount,
    cardId,
    merchantId,
    transactionDate,
    createdDate,
    woveAmount,
    transactionId,
    cashback,
    customerId,
    cardLastNumbers,
    cardType,
    currency,
    dispute,
    merchantName,
    transactionStatus,
    transactionType
  } = transaction;

  return Object.freeze({
    id,
    createdDate,
    accountId,
    cardId,
    amount: amount,
    cashback: cashback,
    cardLastNumbers,
    cardType,
    woveAmount,
    customerId,
    transactionId,
    currency,
    dispute,
    merchantName,
    merchantId,
    transactionDate,
    transactionStatus,
    transactionType
  });
}
