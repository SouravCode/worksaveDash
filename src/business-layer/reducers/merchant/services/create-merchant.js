import { API } from "../../../../services";

export default async function createMerchant(
  {
    name,
    description,
    emailId,
    firstName,
    lastName,
    mobileNumber,
    phoneNumber,
    category,
    logoUrl,
    imageUrls
  },
  accessToken
) {
  const apiResponse = await API.Client.createMerchant(
    {
      name,
      description,
      emailId,
      firstName,
      lastName,
      mobileNumber,
      phoneNumber,
      category,
      logoUrl,
      imageUrls
    },
    accessToken
  );

  return apiResponse;
}
