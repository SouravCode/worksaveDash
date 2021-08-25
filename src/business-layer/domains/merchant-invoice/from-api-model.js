import { DateTime } from "luxon";
export default function fromAPIModel(invoice) {
  const {
    currentStatus,
    createdDate,
    invoiceUrl,
    dueDate,
    name,
    invoices,
    _id,
    endDate,
    id,
    invoiceId,
    invoiceAmount,
    invoiceNumber,
    referenceId,
    startDate,
    status,
    paidDate,
    modifiedDate,
    transactions
  } = invoice;
  return Object.freeze({
    currentStatus,
    name,
    invoices,
    createdDate: DateTime.fromISO(createdDate).toFormat("dd LLL yyyy"),
    invoiceUrl,
    _id,
    dueDate: DateTime.fromISO(dueDate, { zone: "utc" }).toFormat(
      "dd LLL, yyyy"
    ),
    endDate: DateTime.fromISO(endDate, { zone: "utc" }).toFormat(
      "dd LLL, yyyy"
    ),
    id,
    invoiceId,
    paidDate,
    invoiceAmount,
    invoiceNumber,
    referenceId,
    modifiedDate,
    startDate: DateTime.fromISO(startDate).toFormat("dd LLL, yyyy"),
    status,
    transactions
  });
}
