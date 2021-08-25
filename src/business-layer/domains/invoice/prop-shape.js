import { PropTypes } from "prop-types";

export default PropTypes.shape({
  id: PropTypes.string.isRequired,
  createdDate: PropTypes.string.isRequired,
  currentStatus: PropTypes.string.isRequired,
  dueDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  invoiceNumber: PropTypes.string.isRequired,
  isParent: PropTypes.string.isRequired,
  modifiedDate: PropTypes.string.isRequired,
  referenceId: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired
});
