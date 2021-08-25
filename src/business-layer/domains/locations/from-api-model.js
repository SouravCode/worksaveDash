import { Location } from "..";

export default function fromAPIModel(locations) {
  if (!locations) {
    return Object.freeze([]);
  }
  return Object.freeze(locations.map(a => Location.fromAPIModel(a)));
}
