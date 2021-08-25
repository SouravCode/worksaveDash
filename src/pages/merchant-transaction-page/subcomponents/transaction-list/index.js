import PropTypes from "prop-types";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { connect } from "react-redux";
import { getAccessToken } from "../../../../services/src/auth-service/firebase";
import DataGrid, { Column, Paging, Pager } from "devextreme-react/data-grid";
import { DateTime } from "luxon";
import { Popup } from "devextreme-react/popup";
import { Merchant } from "../../../../business-layer/reducers";
import { Transactions as TransactionsDomain } from "../../../../business-layer/domains";
import LoadIndicator from "devextreme-react/load-indicator";
import InfoTab from "../create-dispute/index";
import { cloneDeep } from "lodash";
import Form, {
  Item,
  Label,
  ButtonItem,
  ButtonOptions,
  GroupItem
} from "devextreme-react/form";
import { getStatus } from "../../../../services/src/api/models/client";
import "./transaction-list.scss";

function TransactionsList({
  getMerchantTransactions,
  getDefaultTransactions,
  transactions,
  isLoading
}) {
  const [transData, setTrans] = useState([]);
  const [formData, setformData] = useState(useRef({}));
  const [statusArray, setStatusArray] = useState([]);
  const [change, setChange] = useState(false);

  let settledTransactions = 0;
  let authorizedTransactions = 0;
  let totalTransactions = 0;
  let cancelledTransactions = 0;
  let message = "";
  let rating = "";
  let transactionDetails = [];
  useEffect(() => {
    let query = "";
    Status();
    const merchantDetails = localStorage.getItem("merchant")
      ? JSON.parse(localStorage.getItem("merchant"))
      : "";
    getAccessToken().then(token => {
      getDefaultTransactions(merchantDetails.id, token, query);
    });
  }, [getDefaultTransactions]);

  const Status = async () => {
    let type = "transactionStatus";
    const token = await getAccessToken();
    console.log('______________', type, token);
    const apiResponce = await getStatus(type, token);
    setStatusArray(apiResponce.results.data.transactionStatus);
  };
  if (transactions && transactions.length > 0) {
    transactionDetails = cloneDeep(transactions);
    transactionDetails.map((e, index) => {
      if (e.feedback.length > 0) {
        e.feedback.map(msg => {
          message = msg.note;
          rating = msg.value;
        });
        return (e.message = message), (e.rating = rating);
      }
      return (e.message = "-"), (e.rating = "-");
    });
  }
  if (transactions && transactions.length > 0) {
    totalTransactions = transactions.length;
    transactions.find(transaction => {
      if (transaction.transactionStatus == "CLEARED") {
        settledTransactions = settledTransactions + 1;
      } else if (transaction.transactionStatus == "PENDING") {
        authorizedTransactions = authorizedTransactions + 1;
      } else if (transaction.transactionStatus == "CANCELLED_OR_REFUND") {
        cancelledTransactions = cancelledTransactions + 1;
      }
    });
  }

  const onCancel = () => {
    setChange();
    setTrans([]);
  };

  const onSuccess = () => {
    const { status, startDate, endDate } = formData.current;
    let start = startDate
      ? DateTime.fromISO(startDate.toISOString())
        .startOf("day")
        .toISO()
      : "";
    let end = endDate
      ? DateTime.fromISO(endDate.toISOString())
        .startOf("day")
        .toISO()
      : "";
    start = start.replace("+05:30", "Z");
    end = end.replace("00:00:00.000+05:30", "23:59:59.999Z");
    const query = `startDate=${start ? start : ""}&endDate=${end ? end : ""
      }&status=${status ? status : ""}`;
    const merchantDetails = localStorage.getItem("merchant")
      ? JSON.parse(localStorage.getItem("merchant"))
      : "";
    getAccessToken().then(token => {
      getMerchantTransactions(merchantDetails.id, token, query);
    });
  };

  const onRaise = data => {
    setChange(true);
    transData.push(data);
    setTrans(transData);
    console.log(transData);
  };
  let form = useRef({});
  const clearState = () => {
    setformData(form);
  };

  const onReset = () => {
    if (formData && formData.current) {
      setformData(
        delete formData.current.status,
        delete formData.current.startDate,
        delete formData.current.endDate
      );
      console.log(formData);
    }
    clearState();
    const merchantDetails = localStorage.getItem("merchant")
      ? JSON.parse(localStorage.getItem("merchant"))
      : "";
    let query = "";
    getAccessToken().then(token => {
      getDefaultTransactions(merchantDetails.id, token, query);
    });
  };

  const renderGridCell = data => {
    return (
      <tbody>
        <tr>
          <p className="align">
            <td>
              {DateTime.fromISO(data.data.transactionDate).toFormat(
                "dd LLL yy HH:mm"
              )}
            </td>
          </p>
          <td>
            <p className={"transAlign"}>{data.data.transactionId}</p>
          </td>
          <td>
            <p className={"transAlign"}>
              {data.data.cardLastNumbers ? data.data.cardLastNumbers : ""}
            </p>
          </td>
          <td>
            <p className={"transAlign"}>
              {data.data.cardType ? data.data.cardType : ""}
            </p>
          </td>
          <td>
            <p className={"transAlign"}>
              {data.data.amount ? data.data.amount : 0}
            </p>
          </td>
          <td>
            <p className={"transAlign"}>
              {data.data.cashback ? data.data.cashback : 0}
            </p>
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
          <td>
            <p className={"transAlign"}>
              {data.data.dispute && data.data.dispute.length > 0 ? (
                "-"
              ) : (
                <button
                  className={"closedChip"}
                  onClick={() => onRaise(data.data)}
                >
                  <p>Raise Dispute</p>
                </button>
              )}
            </p>
          </td>
          <td>
            <p className={"transAlign feedback-rating"}>
              {data.data.rating ? data.data.rating : "-"}
            </p>
          </td>
          <td>
            <p
              className={"transAlign feedback-msg"}
              title={data.data.message ? data.data.message : "-"}
            >
              {data.data.message ? data.data.message : "-"}
            </p>
          </td>
        </tr>
      </tbody>
    );
  };

  return (
    <React.Fragment>
      <Form formData={formData.current}>
        <GroupItem colCount={3}>
          <Item
            dataField={"status"}
            editorType="dxSelectBox"
            editorOptions={{ typeEditorOptions, items: statusArray }}
          >
            <Label text={"Transaction Status"} />
          </Item>
          <Item
            dataField={"startDate"}
            editorType={"dxDateBox"}
            editorOptions={{ placeholder: "MM/DD/YYYY" }}
          />

          <Item
            dataField={"endDate"}
            editorType={"dxDateBox"}
            colCount={1}
            editorOptions={{ placeholder: "MM/DD/YYYY" }}
          />

          <ButtonItem>
            <ButtonOptions
              onClick={onSuccess}
              type={"filter"}
              width={"100%"}
              text={"submit"}
              className={"custom-button"}
            />
          </ButtonItem>
          <ButtonItem>
            <ButtonOptions
              onClick={onReset}
              type={"reset"}
              width={"100%"}
              text={"Reset"}
              className={"custom-button"}
            />
          </ButtonItem>
        </GroupItem>
        <Item />
      </Form>

      <div className={"row space-between"}>
        <div className={"totalTransaction "}>
          <div
            className={" transaction row space-between transaction-container"}
          >
            <div className={"label my-auto"}>
              <p>Total</p>
              <p>transactions</p>
            </div>
            <div className={"val my-auto"}>{totalTransactions}</div>
          </div>
        </div>
        <div className={"settledTransaction "}>
          <div
            className={" transaction row space-between transaction-container"}
          >
            <div className={"label my-auto"}>
              <p>Settled</p>
              <p>transactions</p>
            </div>
            <div className={"val my-auto"}>{settledTransactions}</div>
          </div>
        </div>
        <div className={"authorizedTransaction "}>
          <div
            className={" transaction row space-between transaction-container"}
          >
            <div className={"label my-auto"}>
              <p>Authorized</p>
              <p>transactions</p>
            </div>
            <div className={"val my-auto"}>{authorizedTransactions}</div>
          </div>
        </div>
        <div className={"declinedTransaction "}>
          <div
            className={" transaction row space-between transaction-container"}
          >
            <div className={"label my-auto"}>
              <p>Declined</p>
              <p>transactions</p>
            </div>
            <div className={"val my-auto"}>{cancelledTransactions}</div>
          </div>
        </div>
        <Popup
          visible={change}
          dataSource={transData}
          title="DISPUTE"
          width={650}
          height={540}
        >
          <InfoTab data={transData} onCancel={onCancel} />
        </Popup>
      </div>
      <span className="dx-button-text">
        {isLoading ? (
          <LoadIndicator width={"24px"} height={"24px"} visible={true} />
        ) : (
          ""
        )}
      </span>
      <DataGrid
        dataSource={transactionDetails}
        rowRender={renderGridCell}
        disabled={isLoading}
      >
        <Paging defaultPageSize={20} />
        <Pager showInfo={true} />
        <Column caption={"Date & Time"} />
        <Column caption={"Trans.ID"} />
        <Column caption={"Card Number"} />
        <Column caption={"Card Type"} />
        <Column caption={"Amount (£)"} />
        <Column caption={"Cashback (£)"} />
        <Column caption={"Trans.Status"} />
        <Column caption={"Dispute.Status"} />
        <Column caption={"Raise Dispute"} />
        <Column caption={"Ratings"} />
        <Column caption={"FeedBack"} />
      </DataGrid>
    </React.Fragment>
  );
}

TransactionsList.propTypes = {
  getMerchantTransactions: PropTypes.func.isRequired,
  getDefaultTransactions: PropTypes.func.isRequired,
  transactions: TransactionsDomain.PropShape,
  isLoading: PropTypes.bool
};

const mapDispatchToProps = {
  getMerchantTransactions: Merchant.actions.getMerchantTransactions,
  getDefaultTransactions: Merchant.actions.getDefaultTransactions
};

const mapStateToProps = state => ({
  transactions: Merchant.selectors.getTransactions(state),
  isLoading: Merchant.selectors.isLoading(state)
});

const connected = connect(
  mapStateToProps,
  mapDispatchToProps
);

const typeEditorOptions = { placeholder: "Category" };

export default connected(TransactionsList);
