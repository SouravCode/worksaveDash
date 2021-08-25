import { API } from "../../../../services";

export default async function paymentInitiate(
  accessToken,
  { merchantObjId, remotePaymentAccountId, amount, invoiceId }
) {
  const apiResponse = await API.Client.stripePaymentIntial(accessToken, {
    merchantObjId,
    remotePaymentAccountId,
    amount,
    invoiceId
  });
  return apiResponse;
}
