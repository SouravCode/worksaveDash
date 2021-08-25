import { Feedback } from "../";

export default function fromAPIModel(feedback) {
  if (!feedback) {
    return Object.freeze([]);
  }
  return Object.freeze(feedback.map(feed => Feedback.fromAPIModel(feed)));
}
