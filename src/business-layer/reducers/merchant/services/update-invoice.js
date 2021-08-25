import { API } from "../../../../services";

export default async function updateInvoice(
  { status, comment, merchantId, invoiceId },
  accessToken
) {
  const apiResponse = await API.Client.updateInvoice(
    { status, comment, merchantId, invoiceId },
    accessToken
  );
  return apiResponse;
}
