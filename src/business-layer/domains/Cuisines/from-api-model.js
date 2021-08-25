import { Cuisine } from "..";

export default function fromAPIModel(cuisines) {
  if (!cuisines) {
    return Object.freeze([]);
  }
  return Object.freeze(cuisines.map(a => Cuisine.fromAPIModel(a)));
}
