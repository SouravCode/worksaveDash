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
    date: DateTime.fromISO(_id).toFormat("dd-LL"),
    totalSales: totalSales ? totalSales : 0,
    openDispute,
    closeDispute,
    totalCustomers,
    totalCashback: totalCashback ? totalCashback : 0,
    newCustomers,
    existingCustomers,
    totalTransactions
  });
}
