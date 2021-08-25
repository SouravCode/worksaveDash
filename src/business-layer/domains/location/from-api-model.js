import { LocationIntegration } from "../";
import { Products } from "../";
import { CardSchemes } from "../";
import { WorkingTimings } from "../";
import { Contacts } from "../";
import { Cuisines } from "../";
export default function fromAPIModel({
  id,
  latitude,
  longitude,
  line1,
  line2,
  city,
  currency,
  cuisines,
  zip,
  state,
  country,
  contact,
  workingTimings,
  cardSchemes,
  offers,
  products,
  integrationData
}) {
  return Object.freeze({
    id,
    latitude,
    longitude,
    line1,
    line2,
    city,
    currency,
    cuisines: Cuisines.fromAPIModel(cuisines),
    zip,
    state,
    country,
    contact: Contacts.fromAPIModel(contact),
    workingTimings: WorkingTimings.fromAPIModel(workingTimings),
    cardSchemes: CardSchemes.fromAPIModel(cardSchemes),
    offers,
    products: Products.fromAPIModel(products),
    integrationData: integrationData
      ? LocationIntegration.fromAPIModel(integrationData)
      : {}
  });
}
