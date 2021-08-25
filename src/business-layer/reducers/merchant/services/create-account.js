import { API } from "../../../../services";

export default async function createAccount(
  { accountName, accountType, accountNumber, merchantId, routingNumber },
  accessToken
) {
  const apiResponse = await API.Client.createAccount(
    {
      accountName,
      accountType,
      accountNumber,
      merchantId,
      routingNumber
    },
    accessToken
  );

  return apiResponse;
}
