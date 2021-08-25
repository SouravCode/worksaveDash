export default function fromAPIModel({
  cardType,
  isValid,
  iconUrl,
  retailMerchantId
}) {
  return Object.freeze({
    cardType,
    isValid,
    iconUrl,
    retailMerchantId
  });
}
