export default function fromAPIModel({
  id,
  createdDate,
  modifiedDate,
  remoteMerchantAccountId,
  remoteMerchantConsent,
  remoteMerchantUserAccountId,
  remoteMerchantId,
  remoteUserId,
  remoteMerchantLive,
  remoteMerchantLogoURL,
  remoteMerchantName
}) {
  return Object.freeze({
    id,
    createdDate,
    modifiedDate,
    remoteMerchantAccountId,
    remoteMerchantConsent,
    remoteMerchantUserAccountId,
    remoteMerchantId,
    remoteUserId,
    remoteMerchantLive,
    remoteMerchantLogoURL,
    remoteMerchantName
  });
}
