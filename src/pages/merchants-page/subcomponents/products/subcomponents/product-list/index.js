import React from "react";
import PropTypes from "prop-types";
import { cloneDeep } from "lodash";
import DataGrid, { Column, MasterDetail } from "devextreme-react/data-grid";
import ProductDetails from "./product-details";

function ProductsList(data) {
  const merchantId = data.data.data.id;

  const locationId =
    data.data.data.locations.length > 0 && data.data.data.locations[0]
      ? data.data.data.locations[0].id
      : "";
  const productDetails = cloneDeep(
    data.data.data.locations.length > 0
      ? data.data.data.locations[0].products
      : ""
  );
  if (productDetails) {
    productDetails.map(e => {
      return (e.merchantId = merchantId), (e.locationId = locationId);
    });
  }

  return (
    <DataGrid
      className={"dx-card wide-card"}
      showBorders={false}
      visible={true}
      dataSource={productDetails}
      keyExpr="id"
    >
      <MasterDetail enabled={true} component={ProductDetails} />
      <Column dataField={"name"} caption={"Name"} />
      <Column dataField={"description"} caption={"Description"} width={100} />
      <Column dataField={"price"} caption={"Price"} />
    </DataGrid>
  );
}
ProductsList.propTypes = {
  data: PropTypes.object
};

export default ProductsList;
