import { PropTypes } from "prop-types";

export default PropTypes.shape({
  _id: PropTypes.string,
  totalSales: PropTypes.number.isRequired,
  openDispute: PropTypes.number.isRequired,
  closeDispute: PropTypes.number.isRequired,
  totalCustomers: PropTypes.number.isRequired,
  newCustomers: PropTypes.number.isRequired,
  existingCustomers: PropTypes.number.isRequired,
  totalTransactions: PropTypes.number.isRequired
});
