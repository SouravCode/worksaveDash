import { PropTypes } from "prop-types";

export default PropTypes.shape({
  id: PropTypes.string.isRequired,
  createdDate: PropTypes.string.isRequired,
  modifiedDate: PropTypes.string.isRequired,
  remoteLocationAccountId: PropTypes.string.isRequired,
  remoteLocationActive: PropTypes.string.isRequired,
  remoteLocationId: PropTypes.string.isRequired,
  remoteLocationLive: PropTypes.string.isRequired
});
