import { API } from "../../../../services";

export default async function updateMerchant(
  {
    name,
    description,
    emailId,
    firstName,
    lastName,
    mobileNumber,
    phoneNumber,
    logoUrl,
    category,
    id,
    status,
    imageUrls
  },
  accessToken
) {
  const apiResponse = await API.Client.updateMerchant(
    {
      name,
      description,
      emailId,
      firstName,
      lastName,
      mobileNumber,
      phoneNumber,
      logoUrl,
      category,
      id,
      status,
      imageUrls
    },
    accessToken
  );

  return apiResponse;
}
