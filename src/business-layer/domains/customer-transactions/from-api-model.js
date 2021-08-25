import { CustomerTransaction } from "../";

export default function fromAPIModel(transactions) {
  return Object.freeze(
    transactions.map(c => CustomerTransaction.fromAPIModel(c))
  );
}
