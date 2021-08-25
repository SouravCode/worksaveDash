export default function fromAPIModel({
  id,
  name,
  priority,
  price,
  imageUrls,
  modifiedDate,
  createdDate,
  description
}) {
  return Object.freeze({
    id,
    name,
    priority,
    price,
    imageUrls,
    modifiedDate,
    createdDate,
    description
  });
}
