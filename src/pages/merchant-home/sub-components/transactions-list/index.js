import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getAccessToken } from "../../../../services/src/auth-service/firebase";
import DataGrid, { Column, Paging, Pager } from "devextreme-react/data-grid";
import { DateTime } from "luxon";
import LoadIndicator from "devextreme-react/load-indicator";
import { MerchantDashboard } from "../../../../business-layer/reducers";
import { Transactions as TransactionsDomain } from "../../../../business-layer/domains";

import "./transactions-list.scss";

function TransactionList({
  getMerchantTransactions,
  transactions,
  data,
  isLoading
}) {
  useEffect(() => {
    const merchantDetails = localStorage.getItem("merchant")
      ? JSON.parse(localStorage.getItem("merchant"))
      : "";
    const startDate = DateTime.utc()
      .startOf("day")
      .toISO();

    const endDate = DateTime.utc()
      .endOf("day")
      .toISO();

    const query = `startDate=${data && data.startDate ? data.startDate : startDate
      }&endDate=${data && data.endDate ? data.endDate : endDate}`;
    getAccessToken().then(token => {
      getMerchantTransactions(merchantDetails.id, token, query);
    });

  }, [data, getMerchantTransactions]);
  const renderGridCell = data => {
    return (
      <tbody>
        <tr className={"gridCell"}>
          <td>
            <p>
              {DateTime.fromISO(data.data.transactionDate).toFormat(
                "dd LLL yy HH:mm"
              )}
            </p>
          </td>
          <td>
            <p className={"ellipse"}>{data.data.transactionId}</p>
          </td>

          <td>
            <p>{data.data.cardLastNumbers ? data.data.cardLastNumbers : ""}</p>
          </td>
          <td>
            <p>{data.data.cardType ? data.data.cardType : ""}</p>
          </td>
          <td>
            <p>{data.data.amount ? data.data.amount : 0}</p>
          </td>
          <td>
            <p>{data.data.cashback ? data.data.cashback : 0}</p>
          </td>
          <td>
            {data.data.transactionStatus == "CLEARED" ? (
              <p className={"cleared"}>{data.data.transactionStatus}</p>
            ) : (
              ""
            )}
            {data.data.transactionStatus == "PENDING" ? (
              <p className={"pendingStatus"}>{data.data.transactionStatus}</p>
            ) : (
              ""
            )}
            {data.data.transactionStatus !== "CLEARED" &&
              data.data.transactionStatus !== "PENDING" ? (
              <p className={"allStatus"}>{data.data.transactionStatus}</p>
            ) : (
              ""
            )}
          </td>
          <td>
            {data.data.dispute &&
              data.data.dispute.length > 0 &&
              data.data.dispute[data.data.dispute.length - 1].status ==
              "PENDING" ? (
              <p class="pendingStatus">
                {" "}
                {data.data.dispute[data.data.dispute.length - 1].status}{" "}
              </p>
            ) : (
              ""
            )}
            {data.data.dispute &&
              data.data.dispute.length > 0 &&
              data.data.dispute[data.data.dispute.length - 1].status ==
              "CLOSED" ? (
              <p class="declined">
                {" "}
                {data.data.dispute[data.data.dispute.length - 1].status}
              </p>
            ) : (
              ""
            )}
            {data.data.dispute &&
              data.data.dispute.length > 0 &&
              data.data.dispute[data.data.dispute.length - 1].status !==
              "PENDING" &&
              data.data.dispute[data.data.dispute.length - 1].status !==
              "CLOSED" ? (
              <p class="allStatus">
                {" "}
                {data.data.dispute[data.data.dispute.length - 1].status}{" "}
              </p>
            ) : (
              ""
            )}
            {data.data.dispute && data.data.dispute.length == 0 ? (
              <p className={"transAlign"}>{"-"}</p>
            ) : (
              ""
            )}
          </td>
        </tr>
      </tbody>
    );
  };
  return (
    <div id="transactionTable">
      <span className="dx-button-text">
        {isLoading ? (
          <LoadIndicator width={"24px"} height={"24px"} visible={true} />
        ) : (
          ""
        )}
      </span>
      <DataGrid
        dataSource={transactions}
        rowRender={renderGridCell}
        allowUserToAddRows={false}
        disabled={isLoading}
      >
        <Paging defaultPageSize={15} />
        <Pager showInfo={true} />
        <Column caption={"Date & Time"} />
        <Column caption={"Trans.ID"} />
        <Column caption={"Card Number"} />
        <Column caption={"Card Type"} />
        <Column caption={"Amount"} />
        <Column caption={"Cashback"} />
        <Column caption={"Trans.Status"} />
        <Column caption={"Dispute.Status"} />
      </DataGrid>
    </div>
  );
}

TransactionList.propTypes = {
  getMerchantTransactions: PropTypes.func.isRequired,
  transactions: TransactionsDomain.PropShape,
  data: PropTypes.object,
  isLoading: PropTypes.bool
};

const mapDispatchToProps = {
  getMerchantTransactions: MerchantDashboard.actions.getMerchantTransactions
};

const mapStateToProps = state => ({
  transactions: MerchantDashboard.selectors.getTransactions(state),
  isLoading: MerchantDashboard.selectors.isTransactionLoading(state)
});

const connected = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connected(TransactionList);
