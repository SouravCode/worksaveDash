import { WorkingTiming } from "..";

export default function fromAPIModel(workingTimings) {
  if (!workingTimings) {
    return Object.freeze([]);
  }
  return Object.freeze(workingTimings.map(a => WorkingTiming.fromAPIModel(a)));
}
