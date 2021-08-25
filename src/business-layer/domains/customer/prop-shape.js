import { PropTypes } from "prop-types";

export default PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  emailId: PropTypes.string.isRequired,
  mobileNumber: PropTypes.string.isRequired,
  createdDate: PropTypes.string.isRequired,
  modifiedDate: PropTypes.string.isRequired
});
