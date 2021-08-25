import { PropTypes } from "prop-types";

export default PropTypes.shape({
  cardType: PropTypes.string.isRequired,
  isValid: PropTypes.bool
});
