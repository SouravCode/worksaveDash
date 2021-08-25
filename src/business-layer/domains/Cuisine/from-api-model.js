export default function fromAPIModel({ id, priority, name }) {
  return Object.freeze({
    id,
    priority,
    name
  });
}
