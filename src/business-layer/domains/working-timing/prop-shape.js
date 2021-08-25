import { PropTypes } from "prop-types";

export default PropTypes.shape({
  weekDay: PropTypes.string.isRequired,
  openingTimings: PropTypes.string.isRequired,
  closingTimings: PropTypes.string.isRequired,
  isOpen: PropTypes.bool
});
