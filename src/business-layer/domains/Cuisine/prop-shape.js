import { PropTypes } from "prop-types";

export default PropTypes.shape({
  priority: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
});
