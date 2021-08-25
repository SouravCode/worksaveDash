import { API } from "../../../../services";

export default async function createContact({
  merchantId,
  display,
  type,
  value
}) {
  const apiResponse = await API.Client.createBusinessContact({
    merchantId,
    display,
    type,
    value
  });

  return apiResponse;
}
