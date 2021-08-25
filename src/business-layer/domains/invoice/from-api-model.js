import { DateTime } from "luxon";

export default function fromAPIModel(invoice) {
  const {
    name,
    invoices,
    _id,
    createdDate,
    currentStatus,
    dueDate,
    endDate,
    id,
    invoiceNumber,
    invoiceAmount,
    invoiceId,
    isParent,
    modifiedDate,
    referenceId,
    startDate,
    status,
    transactions,
    invoiceUrl
  } = invoice;

  return Object.freeze({
    name,
    invoices,
    _id,
    createdDate: DateTime.fromISO(createdDate).toFormat("dd LLL yyyy"),
    currentStatus,
    id,
    invoiceId,
    dueDate: DateTime.fromISO(dueDate, { zone: "utc" }).toFormat("dd LLL yyyy"),
    endDate: DateTime.fromISO(endDate, { zone: "utc" }).toFormat("dd LLL yyyy"),
    invoiceNumber,
    invoiceAmount,
    isParent,
    modifiedDate: DateTime.fromISO(modifiedDate).toFormat("dd LLL yyyy"),
    referenceId,
    startDate: DateTime.fromISO(startDate).toFormat("dd LLL yyyy"),
    status,
    transactions,
    invoiceUrl
  });
}
