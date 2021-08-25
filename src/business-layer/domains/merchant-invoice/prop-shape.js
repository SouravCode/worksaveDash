import { PropTypes } from "prop-types";
export default PropTypes.shape({
  currentStatus: PropTypes.string.isRequired,
  dueDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  invoiceNumber: PropTypes.string.isRequired,
  referenceId: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired
});
