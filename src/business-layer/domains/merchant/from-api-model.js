import { Locations } from "../";
import { MerchantIntegration } from "../";
import { DateTime } from "luxon";

export default function fromAPIModel(merchant) {
  const {
    id,
    accounts,
    name,
    firstName,
    lastName,
    mobileNumber,
    phoneNumber,
    description,
    emailId,
    createdDate,
    imageUrls,
    modifiedBy,
    modifiedDate,
    merchantId,
    status,
    remoteMerchantId,
    invoices,
    locations,
    logoUrl,
    category,
    integrationData
  } = merchant;

  return Object.freeze({
    id,
    accounts,
    name,
    firstName,
    lastName,
    mobileNumber,
    phoneNumber,
    description,
    emailId,
    status,
    createdDate,
    modifiedBy,
    imageUrls,
    integrationData: integrationData
      ? MerchantIntegration.fromAPIModel(integrationData)
      : {},
    modifiedDate,
    remoteMerchantId,
    merchantId,
    invoices,
    category,
    locations: Locations.fromAPIModel(locations),
    logoUrl
  });
}
