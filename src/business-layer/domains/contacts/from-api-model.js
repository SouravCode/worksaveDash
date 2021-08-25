import { Contact } from "../";

export default function fromAPIModel(contact) {
  if (!contact) {
    return Object.freeze([]);
  }
  return Object.freeze(contact.map(cont => Contact.fromAPIModel(cont)));
}
