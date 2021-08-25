import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Customer } from "../../../../../../business-layer/reducers";
import { CustomerRedeems as RedeemsDomain } from "../../../../../../business-layer/domains";
import { getAccessToken } from "../../../../../../services/src/auth-service/firebase";
import PropTypes from "prop-types";
import { DateTime } from "luxon";
import { cloneDeep } from "lodash";
import "devextreme/data/odata/store";

import DataGrid, {
  Column,
  Pager,
  Paging,
  MasterDetail
} from "devextreme-react/data-grid";
import RedeemDetails from "./redeem-details";

function RedeemList({ data, getCustomerRedeem, customerRedeems }) {
  let id = data.id;
  let redeemDetails = [];
  let fromDate = "";
  let endDate = "";
  useEffect(() => {
    getAccessToken().then(token => {
      getCustomerRedeem(id, token);
    });

  }, [getCustomerRedeem]);

  if (customerRedeems && customerRedeems.length > 0) {
    redeemDetails = cloneDeep(customerRedeems);

    redeemDetails.map((e, index) => {
      fromDate =
        redeemDetails[index] && redeemDetails[index].createdDate
          ? DateTime.fromISO(redeemDetails[index].createdDate).toFormat(
            "dd LLL yy HH:mm"
          )
          : "-";
      endDate =
        redeemDetails[index] && redeemDetails[index].paidDate
          ? DateTime.fromISO(redeemDetails[index].paidDate).toFormat(
            "dd LLL yy HH:mm"
          )
          : "-";
      return (e.fromDate = fromDate), (e.payedDate = endDate);
    });
  }
  console.log(redeemDetails);
  return (
    <DataGrid
      className={"dx-card wide-card"}
      showBorders={false}
      focusedRowEnabled={true}
      columnAutoWidth={true}
      dataSource={redeemDetails}
      keyExpr="id"
    >
      <Paging defaultPageSize={10} />
      <MasterDetail enabled={true} component={RedeemDetails} />
      <Column dataField={"redeemId"} caption={"ID"} />
      <Column dataField={"fromDate"} caption={"Requested Date"} />
      <Column dataField={"payedDate"} caption={"Payed Date"} />
      <Column dataField={"amount"} caption={"Amount"} />
      <Column dataField={"status"} caption={"Status"} />
    </DataGrid>
  );
}
RedeemList.propTypes = {
  getCustomerRedeem: PropTypes.func.isRequired,
  customerRedeems: RedeemsDomain.PropShape,
  data: PropTypes.object,
  isLoading: PropTypes.bool
};

const mapDispatchToProps = {
  getCustomerRedeem: Customer.actions.getCustomerRedeem
};

const mapStateToProps = state => ({
  customerRedeems: Customer.selectors.getCustomerRedeem(state),
  isLoading: Customer.selectors.isLoading(state)
});

const connected = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connected(RedeemList);
