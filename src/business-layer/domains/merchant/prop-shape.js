import { PropTypes } from "prop-types";
import { PropShape as LocationPropShape } from "../locations";
import { PropShape as IntegrationDataPropShape } from "../merchantIntegrationdata";
export default PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  createdDate: PropTypes.string,
  integrationData: IntegrationDataPropShape,
  modifiedBy: PropTypes.string,
  modifiedDate: PropTypes.string,
  remoteMerchantId: PropTypes.string,
  locations: LocationPropShape
});
