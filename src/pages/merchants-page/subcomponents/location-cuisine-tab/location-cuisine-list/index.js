import React from "react";
import PropTypes from "prop-types";
import { cloneDeep } from "lodash";
import DataGrid, { Column, MasterDetail } from "devextreme-react/data-grid";
import LocationDetails from "./location-cuisine-details";
function LocationCuisineList(data) {
  const merchantId = data.data.data.id;

  const locationId =
    data.data.data.locations.length > 0 && data.data.data.locations[0]
      ? data.data.data.locations[0].id
      : "";
  const cuisinesDetails = cloneDeep(
    data.data.data.locations.length > 0
      ? data.data.data.locations[0].cuisines
      : ""
  );
  if (cuisinesDetails) {
    cuisinesDetails.map(e => {
      return (e.merchantId = merchantId), (e.locationId = locationId);
    });
  }
  return (
    <DataGrid className={"dx-card wide-card"} dataSource={cuisinesDetails}>
      <MasterDetail enabled={true} component={LocationDetails} />
      <Column dataField={"priority"} caption={"Priority"} width={100} />
      <Column />
      <Column dataField={"name"} caption={"Name"} />
    </DataGrid>
  );
}
LocationCuisineList.propTypes = {
  data: PropTypes.object
};

export default LocationCuisineList;
