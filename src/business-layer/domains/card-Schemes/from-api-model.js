import { CardScheme } from "..";

export default function fromAPIModel(cardSchemes) {
  if (!cardSchemes) {
    return Object.freeze([]);
  }
  return Object.freeze(cardSchemes.map(a => CardScheme.fromAPIModel(a)));
}
