import React, { useEffect } from "react";
import { connect } from "react-redux";
import { MerchantDashboard } from "../../../../business-layer/reducers";
import { Transactions as TransactionsDomain } from "../../../../business-layer/domains";
import PropTypes from "prop-types";
import { DateTime } from "luxon";
import { cloneDeep } from "lodash";
import DataGrid, {
  Column,
  Paging,
  FilterRow
} from "devextreme-react/data-grid";
import { getAccessToken } from "../../../../services/src/auth-service/firebase";

function TransactionTab({
  data,
  getMerchantTransactions,
  merchantTransactions
}) {
  const Merchantid = data.data.id;
  const query = "";
  let transactionDetails = [];
  let transDate = "";
  useEffect(() => {
    getAccessToken().then(token => {
      getMerchantTransactions(Merchantid, token, query);
    })
  }, [getMerchantTransactions]);
  if (merchantTransactions && merchantTransactions.length > 0) {
    transactionDetails = cloneDeep(merchantTransactions);
    transactionDetails.map((e, index) => {
      transDate = DateTime.fromISO(
        transactionDetails[index].transactionDate
      ).toFormat("dd LLL yy HH:mm");
      if (e.dispute) {
        let obj = transactionDetails[index].dispute.slice(-1)[0];
        return (
          (e.trans = transDate),
          (e.disputeStatus = obj && obj.status ? obj.status : "-")
        );
      }
    });
  }
  console.log(transactionDetails);
  return (
    <React.Fragment>
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
        <FilterRow visible={false} />
        <Column dataField="trans" caption={"Date & Time"} />
        <Column dataField="customerId" caption={"Customer Id"} />
        <Column dataField="transactionId" caption={"Trans.ID"} />
        <Column dataField="cardLastNumbers" caption={"Card Number"} />
        <Column dataField="cardType" caption={"Card Type"} />
        <Column dataField="amount" caption={"Amount (£)"} />
        <Column dataField="cashback" caption={"Cashback (£)"} />
        <Column dataField="woveAmount" caption={"WoveAmount (£)"} />
        <Column dataField="transactionStatus" caption={"Transaction Status"} />
        <Column dataField="disputeStatus" caption={"Dispute Status"} />
      </DataGrid>
    </React.Fragment>
  );
}
TransactionTab.propTypes = {
  getMerchantTransactions: PropTypes.func.isRequired,
  merchantTransactions: TransactionsDomain.PropShape,
  data: PropTypes.object,
  isLoading: PropTypes.bool
};

const mapDispatchToProps = {
  getMerchantTransactions: MerchantDashboard.actions.getMerchantTransactions
};

const mapStateToProps = state => ({
  merchantTransactions: MerchantDashboard.selectors.getTransactions(state),
  isLoading: MerchantDashboard.selectors.isLoading(state)
});

const connected = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connected(TransactionTab);
