import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Customer } from "../../../../business-layer/reducers";
import { getAccessToken } from "../../../../services/src/auth-service/firebase";
import { CustomerTransactions as TransactionsDomain } from "../../../../business-layer/domains";
import PropTypes from "prop-types";
import { DateTime } from "luxon";
import { cloneDeep } from "lodash";
import DataGrid, {
  Column,
  Paging,
  FilterRow
} from "devextreme-react/data-grid";

function TransactionsTab({
  data,
  getCustomerTransaction,
  CustomerTransactions
}) {
  let id = data.customerId;
  let transactionDetails = [];
  let transDate = "";
  useEffect(() => {
    getAccessToken().then(token => {
      getCustomerTransaction(id, token);
    });

  }, [getCustomerTransaction]);

  if (CustomerTransactions && CustomerTransactions.length > 0) {
    transactionDetails = cloneDeep(CustomerTransactions);
    transactionDetails.map((e, index) => {
      transDate = DateTime.fromISO(
        transactionDetails[index].transactionDate
      ).toFormat("dd LLL yy HH:mm");
      return (e.trans = transDate);
    });
  }

  return (
    <DataGrid
      className={"dx-card wide-card"}
      showBorders={false}
      focusedRowEnabled={true}
      columnAutoWidth={true}
      columnHidingEnabled={true}
      dataSource={transactionDetails}
      keyExpr="id"
    >
      <Paging defaultPageSize={10} />
      {/* <FilterRow visible={true} /> */}
      <Column dataField="trans" caption={"Date & Time"} />
      <Column dataField="customerId" caption={"Customer Id"} />
      <Column dataField="transactionId" caption={"Trans.ID"} />
      <Column dataField="cardLastNumbers" caption={"Card Number"} />
      <Column dataField="cardType" caption={"Card Type"} />
      <Column dataField="amount" caption={"Amount (£)"} />
      <Column dataField="cashback" caption={"Cashback (£)"} />
      <Column dataField="woveAmount" caption={"WoveAmount (£)"} />
    </DataGrid>
  );
}
TransactionsTab.propTypes = {
  getCustomerTransaction: PropTypes.func.isRequired,
  CustomerTransactions: TransactionsDomain.PropShape,
  isLoading: PropTypes.bool
};

const mapDispatchToProps = {
  getCustomerTransaction: Customer.actions.getCustomerTransaction
};

const mapStateToProps = state => ({
  CustomerTransactions: Customer.selectors.getCustomerTransaction(state),
  isLoading: Customer.selectors.isLoading(state)
});

const connected = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connected(TransactionsTab);
