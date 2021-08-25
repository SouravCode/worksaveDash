import { PropTypes } from "prop-types";

export default PropTypes.shape({
  note: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
});
