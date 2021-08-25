import { API } from "../../../../services";

export default async function updateContact({
  merchantId,
  display,
  type,
  value
}) {
  const contact = { display, type, value };

  const apiResponse = await API.Client.updateBusinessContact({
    merchantId,
    contact
  });

  return apiResponse;
}
