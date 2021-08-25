import { PropTypes } from "prop-types";
import React from "react";

import { Provider as APIProvider } from "./api/components";

function ServicesProvider({ children, uri }) {
  return <APIProvider uri={uri}>{children}</APIProvider>;
}

ServicesProvider.defaultProps = {
  uri: "API_DATA_URI"
};

ServicesProvider.propTypes = {
  children: PropTypes.node.isRequired,
  uri: PropTypes.string
};

export default ServicesProvider;
