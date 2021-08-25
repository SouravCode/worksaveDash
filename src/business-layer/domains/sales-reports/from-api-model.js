import { salesReport } from "../";

export default function fromAPIModel(report) {
  report.sort(function(a, b) {
    return new Date(b._id) - new Date(a._id);
  });
  return Object.freeze(report.map(m => salesReport.fromAPIModel(m)));
}
