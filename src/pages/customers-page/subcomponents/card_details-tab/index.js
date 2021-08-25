import React from "react";
import DataGrid, { Column, FilterRow } from "devextreme-react/data-grid";
function CardsTab(data) {
  const cardDetails = data.data.cards;
  return (
    <DataGrid dataSource={cardDetails} keyExpr="id">
      {/* <FilterRow visible={true} /> */}
      <Column dataField="firstNumbers" caption={"First Number"} />
      <Column dataField="lastNumbers" caption={"Last Number"} />
      <Column dataField="expYear" caption={"Expiry Year"} />
      <Column dataField="expMonth" caption={"Expiry Month"} />
      <Column dataField="cardType" caption={"Card Type"} />
      <Column dataField="countryCode" caption={"Country Code"} />
      <Column dataField="status" caption={"Card Status"} />
    </DataGrid>
  );
}
export default CardsTab;
