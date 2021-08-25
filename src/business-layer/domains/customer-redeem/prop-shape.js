import { PropTypes } from "prop-types";

export default PropTypes.shape({
  id: PropTypes.string.isRequired,
  redeemId: PropTypes.string.isRequired,
  accountId: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  createdDate: PropTypes.string.isRequired,
  currentStatus: PropTypes.string.isRequired,
  customerId: PropTypes.string.isRequired,
  referenceId: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired
});
