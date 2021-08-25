export default function fromAPIModel({
  weekDay,
  openingTimings,
  closingTimings,
  isOpen
}) {
  return Object.freeze({
    weekDay,
    openingTimings,
    closingTimings,
    isOpen
  });
}
