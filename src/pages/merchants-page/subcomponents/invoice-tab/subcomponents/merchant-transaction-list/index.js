import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Merchant } from "../../../../../../business-layer/reducers";
import { Transactions as TransactionsDomain } from "../../../../../../business-layer/domains";
import PropTypes from "prop-types";
import DataGrid, {
  Column,
  Pager,
  Paging,
  Selection,
  Summary,
  TotalItem,
  ValueFormat
} from "devextreme-react/data-grid";

function TransactionList({ transactions }) {
  return (
    <DataGrid
      dataSource={transactions}
      keyExpr="id"
      showBorders={true}
      showColumnLines={true}
      onSelectionChanged={onSelectionChanged}
    >
      <Selection mode={"multiple"} />
      <Paging defaultPageSize={10} />
      <Pager showInfo={true} />
      <Column dataField={"id"} caption={"ID"} />
      <Column dataField={"amount"} caption={"Amount"} width={90} />
      <Column dataField={"cardId"} caption={"Card Id"} />
      <Summary>
        <TotalItem column="amount.$numberDecimal" summaryType="sum">
          <ValueFormat format="currency" precision={2} />
        </TotalItem>
      </Summary>
    </DataGrid>
  );
}
const onSelectionChanged = data => {
  console.log(data.selectedRowsData);
};
TransactionList.propTypes = {
  transactions: TransactionsDomain.PropShape,
  isLoading: PropTypes.bool
};

const mapStateToProps = state => ({
  transactions: Merchant.selectors.getTransactions(state),
  isLoading: Merchant.selectors.isLoading(state)
});

const connected = connect(
  mapStateToProps,
  null
);

export default connected(TransactionList);
