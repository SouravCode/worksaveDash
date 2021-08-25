import { API } from "../../../../services";

export default async function updateProduct(
  { name, description, price, imageUrls, locationId, id, productId, priority },
  accessToken
) {
  const apiResponse = await API.Client.updateProduct(
    {
      name,
      description,
      price,
      imageUrls,
      locationId,
      id,
      productId,
      priority
    },
    accessToken
  );

  return apiResponse;
}
