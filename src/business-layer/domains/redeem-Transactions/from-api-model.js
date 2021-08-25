import { RedeemTransaction } from "../";

export default function fromAPIModel(redeemTransactions) {
  return Object.freeze(
    redeemTransactions.map(c => RedeemTransaction.fromAPIModel(c))
  );
}
