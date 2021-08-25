import { Offer } from "..";

export default function fromAPIModel(offer) {
  return Object.freeze(offer.map(m => Offer.fromAPIModel(m)));
}
