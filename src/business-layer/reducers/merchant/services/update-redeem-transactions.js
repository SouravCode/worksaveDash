import { API } from "../../../../services";

export default async function updateRedeemTransactions(
  { status, amount, id },
  accessToken
) {
  const apiResponse = await API.Client.updateCustomerRedeem(
    {
      status,
      amount,
      id
    },
    accessToken
  );

  return apiResponse;
}
