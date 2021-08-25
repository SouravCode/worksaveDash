import { API } from "../../../../services";

export default async function updateAccount(
  {
    merchantId,
    accountId,
    accountName,
    accountType,
    accountNumber,
    routingNumber
  },
  accessToken
) {
  const apiResponse = await API.Client.updateAccount(
    {
      merchantId,
      accountId,
      accountName,
      accountType,
      accountNumber,
      routingNumber
    },
    accessToken
  );

  return apiResponse;
}
