import { DateTime } from "luxon";
import { Feedbacks } from "../";
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
    feedback,
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
    feedback: Feedbacks.fromAPIModel(feedback),
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
