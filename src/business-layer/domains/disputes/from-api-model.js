import { Dispute } from "..";

export default function fromAPIModel(dispute) {
  return Object.freeze(dispute.map(m => Dispute.fromAPIModel(m)));
}
