import { PropTypes } from "prop-types";

export default PropTypes.shape({
  id: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  cardId: PropTypes.string.isRequired
});
