import { DateTime } from "luxon";
export default function fromAPIModel(report) {
  const {
    _id,
    totalSales,
    openDispute,
    closeDispute,
    totalCustomers,
    totalCashback,
    newCustomers,
    existingCustomers,
    totalTransactions
  } = report;

  return Object.freeze({
    date: DateTime.fromISO(_id).toFormat("dd LLL"),
    totalSales: totalSales ? parseFloat(totalSales) : 0,
    openDispute,
    closeDispute,
    totalCustomers,
    totalCashback: totalCashback ? parseFloat(totalCashback) : 0,
    newCustomers,
    existingCustomers,
    totalTransactions
  });
}
