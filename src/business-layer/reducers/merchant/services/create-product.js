import { API } from "../../../../services";

export default async function createProduct(
  { name, description, price, id, imageUrls, locationId },
  accessToken
) {
  const apiResponse = await API.Client.createProduct(
    {
      name,
      description,
      price,
      id,
      imageUrls,
      locationId
    },
    accessToken
  );

  return apiResponse;
}
