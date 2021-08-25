import { PropTypes } from "prop-types";
import { PropShape as IntegrationDataPropShape } from "../locationIntegration";
import { PropShape as productPropShape } from "../product";
import { PropShape as cardSchemePropShape } from "../card-Scheme";
import { PropShape as workingTimingPropShape } from "../working-timing";
import { PropShape as ContactPropShape } from "../contact";
import { PropShape as CuisinePropShape } from "../Cuisine";
export default PropTypes.shape({
  line1: PropTypes.string.isRequired,
  line2: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  zip: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  products: productPropShape,
  contacts: ContactPropShape,
  cuisines: CuisinePropShape,
  workingTimings: workingTimingPropShape,
  cardSchemes: cardSchemePropShape,
  integrationData: IntegrationDataPropShape,
  offers: PropTypes.shape({})
});
