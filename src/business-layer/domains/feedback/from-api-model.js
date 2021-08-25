export default function fromAPIModel({ note, value }) {
  return Object.freeze({
    note,
    value
  });
}
