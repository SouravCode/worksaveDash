import { DateTime } from "luxon";
export default function fromAPIModel(offer) {
  const {
    createdDate,
    endDate,
    endTime,
    id,
    isPrimary,
    isStackable,
    modifiedDate,
    offerLimitValue,
    offerOriginalValue,
    offerType,
    offerValue,
    woveValue,
    startDate,
    startTime,
    status,
    thresholdSpendValue
  } = offer;

  return Object.freeze({
    createdDate: DateTime.fromISO(createdDate).toFormat("dd LLL, yy HH:mm"),
    endDate,
    endTime,
    id,
    isPrimary,
    isStackable,
    modifiedDate,
    offerLimitValue,
    offerOriginalValue,
    offerType,
    offerValue,
    woveValue,
    startDate,
    startTime,
    status,
    thresholdSpendValue
  });
}
