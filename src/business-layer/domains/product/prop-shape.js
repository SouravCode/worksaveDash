import { PropTypes } from "prop-types";

export default PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  priority: PropTypes.string.isRequired,
  imageUrls: PropTypes.shape({}),
  modifiedDate: PropTypes.string.isRequired,
  createdDate: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
});
