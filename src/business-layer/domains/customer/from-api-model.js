import { DateTime } from "luxon";
export default function fromAPIModel(customer) {
  const {
    id,
    mobileNumber,
    modifiedDate,
    name,
    customerId,
    createdDate,
    emailId,
    cards,
    accounts
  } = customer;

  return Object.freeze({
    id,
    mobileNumber,
    customerId,
    modifiedDate: DateTime.fromISO(modifiedDate).toFormat("dd LLL, yy HH:mm"),
    name,
    createdDate: DateTime.fromISO(createdDate).toFormat("dd LLL, yy HH:mm"),
    emailId,
    cards,
    accounts
  });
}
