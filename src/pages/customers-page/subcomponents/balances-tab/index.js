import React from "react";
import DataGrid, { Column, FilterRow } from "devextreme-react/data-grid";
function BalanceTab(data) {
  const accountDetails = data.data.accounts;
  return (
    <DataGrid dataSource={accountDetails}>
      <Column dataField="balance" caption={"Balance"} width={100} />
      <Column dataField="lifetimeBalance" caption={"Life Time Balance"} />
      <Column dataField="trackedBalance" caption={"Tracked Balance"} />
    </DataGrid>
  );
}
export default BalanceTab;
