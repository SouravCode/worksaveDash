import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Merchant } from "../../../../business-layer/reducers";
import { Transactions as TransactionsDomain } from "../../../../business-layer/domains";
import PropTypes from "prop-types";
import { DateTime } from "luxon";
import { cloneDeep } from "lodash";
import DataGrid, {
  Column,
  Pager,
  Paging,
  FilterRow
} from "devextreme-react/data-grid";
import { getAccessToken } from "../../../../services/src/auth-service/firebase";

function TransactionList({ getTransactions, transactions }) {
  let transactionDetails = [];
  let transDate = "";
  let message = "";
  let rating = "";
  useEffect(() => {
    getAccessToken().then(token => {
      getTransactions(token, "");
    });
  }, [getTransactions]);

  if (transactions && transactions.length > 0) {
    transactionDetails = cloneDeep(transactions);
    transactionDetails.map((e, index) => {
      transDate = DateTime.fromISO(
        transactionDetails[index].transactionDate
      ).toFormat("dd LLL yy HH:mm");
      if (e.feedback.length > 0) {
        e.feedback.map(msg => {
          message = msg.note;
          rating = msg.value;
        });
        return (
          (e.trans = transDate), (e.message = message), (e.rating = rating)
        );
      }
      return (e.trans = transDate), (e.message = "-"), (e.rating = "-");
    });
  }

  return (
    <DataGrid
      className={" wide-card"}
      showBorders={false}
      focusedRowEnabled={true}
      dataSource={transactionDetails}
      keyExpr="id"
    >
      <Paging defaultPageSize={20} />
      <Pager showInfo={true} />
      <Column dataField="trans" caption={"Date & Time"} />
      <Column dataField="merchantName" caption={"Merchant Name"} />
      <Column dataField="customerId" caption={"C.Id"} width={50} />
      <Column dataField="transactionId" caption={"Trans.ID"} />
      <Column dataField="cardLastNumbers" caption={"Card Number"} />
      <Column dataField="cardType" caption={"Card Type"} />
      <Column dataField="amount" caption={"Amount (£)"} />
      <Column dataField="cashback" caption={"Cashback (£)"} />
      <Column dataField="woveAmount" caption={"WoveAmount (£)"} />
      <Column dataField="rating" caption={"Rating"} />
      <Column dataField="message" caption={"FeedBack"} />
    </DataGrid>
  );
}
TransactionList.propTypes = {
  getTransactions: PropTypes.func.isRequired,
  transactions: TransactionsDomain.PropShape,
  isLoading: PropTypes.bool
};

const mapDispatchToProps = {
  getTransactions: Merchant.actions.getTransactions
};

const mapStateToProps = state => ({
  transactions: Merchant.selectors.getTransactions(state),
  isLoading: Merchant.selectors.isLoading(state)
});

const connected = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connected(TransactionList);
