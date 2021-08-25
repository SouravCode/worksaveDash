export default function fromAPIModel({
  id,
  display,
  contactType,
  type,
  value
}) {
  return Object.freeze({
    id,
    display,
    contactType,
    type,
    value
  });
}
