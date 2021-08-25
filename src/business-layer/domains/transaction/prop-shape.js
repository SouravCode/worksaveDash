import { PropTypes } from "prop-types";
import { PropShape as FeedbackPropShape } from "../feedback";
export default PropTypes.shape({
  id: PropTypes.string.isRequired,
  accountId: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  cardId: PropTypes.string.isRequired,
  merchantId: PropTypes.string.isRequired,
  feedback: FeedbackPropShape
});
