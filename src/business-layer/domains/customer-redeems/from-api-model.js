import { CustomerRedeem } from "../";

export default function fromAPIModel(redeems) {
  return Object.freeze(redeems.map(c => CustomerRedeem.fromAPIModel(c)));
}
