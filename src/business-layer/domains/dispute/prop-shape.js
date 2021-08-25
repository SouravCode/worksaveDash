import { PropTypes } from "prop-types";

export default PropTypes.shape({
  id: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
  disputeId: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  modifiedDate: PropTypes.string.isRequired,
  referenceId: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired
});
