import { Transaction } from "../";

export default function fromAPIModel(transactions) {
  transactions.sort(function(a, b) {
    return new Date(b.transactionDate) - new Date(a.transactionDate);
  });
  return Object.freeze(transactions.map(m => Transaction.fromAPIModel(m)));
}
