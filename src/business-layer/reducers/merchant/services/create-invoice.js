import { API } from "../../../../services";

export default async function createInvoice(
  {
    startDate,
    endDate,
    dueDate,
    invoiceNumber,
    transactions,
    merchantId,
    invoiceAmount
  },
  accessToken
) {
  const apiResponse = await API.Client.createInvoice(
    {
      startDate,
      endDate,
      dueDate,
      invoiceNumber,
      transactions,
      merchantId,
      invoiceAmount
    },
    accessToken
  );
  return apiResponse;
}
