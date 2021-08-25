import { salesStat } from "../";

export default function fromAPIModel(stat) {
  return Object.freeze(stat.map(m => salesStat.fromAPIModel(m)));
}
