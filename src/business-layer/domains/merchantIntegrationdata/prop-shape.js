import { PropTypes } from "prop-types";

export default PropTypes.shape({
  id: PropTypes.string.isRequired,
  createdDate: PropTypes.string.isRequired,
  modifiedDate: PropTypes.string.isRequired,
  remoteMerchantAccountId: PropTypes.string.isRequired,
  remoteMerchantConsent: PropTypes.string.isRequired,
  remoteMerchantId: PropTypes.string.isRequired,
  remoteMerchantLive: PropTypes.string.isRequired,
  remoteMerchantLogoURL: PropTypes.string.isRequired,
  remoteMerchantName: PropTypes.string.isRequired
});
