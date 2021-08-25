import PropTypes from "prop-types";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { connect } from "react-redux";
import DataGrid, { Column, Paging } from "devextreme-react/data-grid";
import { DateTime } from "luxon";
import { Popup } from "devextreme-react/popup";
import { getAccessToken } from "../../../../services/src/auth-service/firebase"
import { MerchantDashboard } from "../../../../business-layer/reducers";
import { Disputes as DisputesDomain } from "../../../../business-layer/domains";
import { DisputeStat as DisputeStatDomain } from "../../../../business-layer/domains";
import { getStatus } from "../../../../services/src/api/models/client";
import { InfoTab } from "../../subcomponents";
import "./dispute-list.scss";
import Form, {
  Item,
  Label,
  ButtonItem,
  ButtonOptions,
  GroupItem
} from "devextreme-react/form";

function DisputesList({ getDispute, disputes, getDisputeStat, disputeStat }) {
  const [values, setValue] = useState([]);
  const [statusArray, setStatusArray] = useState([]);
  const [formData, setformData] = useState(useRef({}));
  const [userId, setUserId] = useState("");
  const [merchantId, setMerchantId] = useState("");
  const [popupStatus, setpopupStatus] = useState(false);
  const [popupActivate, setpopupActivate] = useState(false);
  const [disputeDetails, setDisputeDetails] = useState({});
  const closeTab = () => {
    setpopupActivate(false);
    setDisputeDetails({});
    getAccessToken().then(token => {
      getDisputeStat(0, {}, token);
      getDispute(0, token, "");
    });

  };

  useEffect(() => {
    Status();
    getAccessToken().then(token => {
      getDisputeStat(0, {}, token);
      getDispute(0, token, "");
    });

  }, [getDispute, getDisputeStat]);
  let totalDispute =
    (disputeStat && disputeStat.openDisputes
      ? parseInt(disputeStat.openDisputes)
      : 0) +
    (disputeStat && disputeStat.closedDisputes
      ? parseInt(disputeStat.closedDisputes)
      : 0);
  let totalDisputeTransactions =
    disputes && disputes.length > 0 ? disputes.length : 0;
  let totalSales =
    (disputeStat &&
      disputeStat.openSalesDispute &&
      disputeStat.openSalesDispute.$numberDecimal
      ? parseFloat(disputeStat.openSalesDispute.$numberDecimal)
      : 0) +
    (disputeStat &&
      disputeStat.closedSalesDispute &&
      disputeStat.closedSalesDispute.$numberDecimal
      ? parseFloat(disputeStat.closedSalesDispute.$numberDecimal)
      : 0);
  let totalCashback =
    (disputeStat &&
      disputeStat.openCashBackDispute &&
      disputeStat.openCashBackDispute.$numberDecimal
      ? parseFloat(disputeStat.openCashBackDispute.$numberDecimal)
      : 0) +
    (disputeStat &&
      disputeStat.closedCashBackDispute &&
      disputeStat.closedCashBackDispute.$numberDecimal
      ? parseFloat(disputeStat.closedCashBackDispute.$numberDecimal)
      : 0);
  const Status = async () => {
    let type = "disputeStatus";
    const token = await getAccessToken();
    const apiResponce = await getStatus(type, token);
    setStatusArray(apiResponce.results.data.disputeStatus);
  };

  const onSuccess = () => {
    const {
      status,
      fromDate,
      toDate,
      cardLastNumbers,
      amount,
      cardType
    } = formData.current;
    let start = fromDate
      ? DateTime.fromISO(fromDate.toISOString())
        .startOf("day")
        .toISO()
      : "";
    let end = toDate
      ? DateTime.fromISO(toDate.toISOString())
        .startOf("day")
        .toISO()
      : "";
    start = start.replace("+05:30", "Z");
    end = end.replace("00:00:00.000+05:30", "23:59:59.999Z");
    let query = "";
    query = status ? `${query}status=${status}` : query;
    query = cardLastNumbers
      ? `${query}&cardLastNumbers=${cardLastNumbers}`
      : query;
    query = cardType ? `${query}&cardType=${cardType}` : query;
    query = amount ? `${query}&amount=${amount}` : query;
    query = start ? `${query}&fromDate=${start}` : query;
    query = end ? `${query}&toDate=${end}` : query;
    getAccessToken().then(token => {
      getDisputeStat(0, query, token);
      getDispute(0, token, query);
    });

  };
  let form = useRef({});
  const clearState = () => {
    setUserId("");
    setMerchantId("");
    setformData(form);
    getAccessToken().then(token => {
      getDisputeStat(0, {}, token);
      getDispute(0, token, "");
    });

  };
  const onDisputeConversation = data => {
    setpopupActivate(true);
    setDisputeDetails(data);
  };
  const onReset = () => {
    if (formData && formData.current) {
      setformData(
        delete formData.current.status,
        delete formData.current.cardLastNumbers,
        delete formData.current.cardType,
        delete formData.current.amount,
        delete formData.current.fromDate,
        delete formData.current.toDate
      );
      console.log(formData);
    }
    clearState();
    getAccessToken().then(token => {
      getDisputeStat(0, {}, token);
      getDispute(0, token, "");
    });

  };

  const renderGridCell = data => {
    return (
      <tbody>
        <tr className={"border"}>
          <td>
            <p>
              <span>{data.data.transactionDate}</span>
            </p>
          </td>
          <td>
            <p className={"ellipse"}>{data.data.transactionId}</p>
          </td>
          <td>
            <p className={"ellipse"}>{data.data.customerId}</p>
          </td>

          <td>
            <p>{data.data.cardType ? data.data.cardType : ""}</p>
          </td>
          <td>
            <p>{data.data.cardLastNumbers ? data.data.cardLastNumbers : ""}</p>
          </td>
          <td>
            <p>{data.data.amount ? data.data.amount : 0}</p>
          </td>
          <td>
            <p>{data.data.cashback ? data.data.cashback : 0}</p>
          </td>
          <td>
            <p className="openChip">
              {data.data.transactionStatus ? data.data.transactionStatus : ""}
            </p>
          </td>

          <td>
            <p className="openChip">
              {data.data.dispute && data.data.dispute.length > 0
                ? data.data.dispute[data.data.dispute.length - 1].status
                : ""}
            </p>
          </td>
          <td>
            <button
              className={"closedChip"}
              onClick={() => onDisputeConversation(data.data)}
            >
              <p>
                {data.data.dispute && data.data.dispute.length > 0
                  ? data.data.dispute.length
                  : 0}
                : messages
              </p>
            </button>
          </td>
          {/* <td>
            <p>
              {data.data.dispute && data.data.dispute.length > 0
                ? data.data.dispute.length
                : 0}
              : new messages
            </p>
          </td> */}
        </tr>
      </tbody>
    );
  };
  return (
    <React.Fragment>
      <Form formData={formData.current}>
        <GroupItem colCount={4}>
          <Item
            dataField={"status"}
            editorType="dxSelectBox"
            editorOptions={{ typeEditorOptions, items: statusArray }}
          >
            <Label text={"Dispute Status"} />
          </Item>
          <Item
            dataField={"fromDate"}
            editorType={"dxDateBox"}
            editorOptions={{ placeholder: "MM/DD/YYYY" }}
          >
            <Label text={"Start Date"} />
          </Item>

          <Item
            dataField={"toDate"}
            editorType={"dxDateBox"}
            colCount={1}
            editorOptions={{ placeholder: "MM/DD/YYYY" }}
          >
            <Label text={"End Date"} />
          </Item>
          <Item dataField={"cardType"} editorType={"dxTextBox"} />
          <Item dataField={"cardLastNumbers"} editorType={"dxTextBox"} />
          {/* <Item dataField={"amount"} editorType={"dxTextBox"}>
            <Label text="Trans.Amount" />
          </Item> */}
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
      </Form>

      <div id="salesReport" class="row space-between">
        <div className="transactions total-disputes-container">
          <div class="trans row space-between">
            <p class="transactionLable">Total Disputes</p>
            <p className="transactionVal total-dispute-val dispute-count">
              {totalDispute}
            </p>
            <div class="row">
              <svg
                width="25"
                height="26"
                viewBox="0 0 25 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.36426 18.6409V23.8818C1.36426 24.6166 2.7802 24.906 3.27003 24.3582L7.55803 19.6583M2.16468 19.6583H23.4332C23.8752 19.6583 24.2336 19.3 24.2336 18.8579V1.57313C24.2336 1.13107 23.8752 0.772705 23.4332 0.772705H2.16468C1.72262 0.772705 1.36426 1.13107 1.36426 1.57313V18.8579C1.36426 19.3 1.72262 19.6583 2.16468 19.6583Z"
                  stroke="#1681B1"
                  stroke-width="0.952888"
                  stroke-linecap="round"
                />
                <circle
                  cx="7.08088"
                  cy="9.58845"
                  r="1.90578"
                  stroke="#1681B1"
                  stroke-width="0.762311"
                />
                <circle
                  cx="12.7977"
                  cy="9.58845"
                  r="1.90578"
                  stroke="#1681B1"
                  stroke-width="0.762311"
                />
                <circle
                  cx="18.5154"
                  cy="9.58845"
                  r="1.90578"
                  stroke="#1681B1"
                  stroke-width="0.762311"
                />
              </svg>
            </div>
          </div>
          <div class="divider" />
          <div class="row space-between">
            <div class="newCustomers ">
              <p class="lable">
                Sales <br />
              </p>
              <p className="val total-dispute-val ">
                £ {parseFloat(totalSales).toFixed(2)}
              </p>
            </div>
            <div class="divider" />
            <div class="existingCustomers">
              <p class="lable">
                Cashback <br />
              </p>
              <p className="val total-dispute-val">
                £ {parseFloat(totalCashback).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
        <div className="transactions closed-disputes-container">
          <div class="trans row space-between">
            <p class="transactionLable closed-dispute-label">Closed Dispute</p>
            <p class="transactionVal closed-dispute-val dispute-count">
              {disputeStat && disputeStat.closedDisputes
                ? disputeStat.closedDisputes
                : 0}
            </p>
            <div class="row">
              <svg
                width="25"
                height="26"
                viewBox="0 0 25 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.36426 18.6409V23.8818C1.36426 24.6166 2.7802 24.906 3.27003 24.3582L7.55803 19.6583M2.16468 19.6583H23.4332C23.8752 19.6583 24.2336 19.3 24.2336 18.8579V1.57313C24.2336 1.13107 23.8752 0.772705 23.4332 0.772705H2.16468C1.72262 0.772705 1.36426 1.13107 1.36426 1.57313V18.8579C1.36426 19.3 1.72262 19.6583 2.16468 19.6583Z"
                  stroke="#1681B1"
                  stroke-width="0.952888"
                  stroke-linecap="round"
                />
                <circle
                  cx="7.08088"
                  cy="9.58845"
                  r="1.90578"
                  stroke="#1681B1"
                  stroke-width="0.762311"
                />
                <circle
                  cx="12.7977"
                  cy="9.58845"
                  r="1.90578"
                  stroke="#1681B1"
                  stroke-width="0.762311"
                />
                <circle
                  cx="18.5154"
                  cy="9.58845"
                  r="1.90578"
                  stroke="#1681B1"
                  stroke-width="0.762311"
                />
              </svg>
            </div>
          </div>
          <div class="divider" />
          <div class="row space-between">
            <div class="newCustomers ">
              <p class="lable closed-dispute-label">
                Sales <br />
              </p>
              <p class="val transactionVal closed-dispute-val">
                £{" "}
                {disputeStat && disputeStat.closedSalesDispute
                  ? disputeStat.closedSalesDispute.$numberDecimal
                  : 0}
              </p>
            </div>
            <div class="divider" />
            <div class="existingCustomers">
              <p class="lable closed-dispute-label">
                Cashback <br />
              </p>
              <p class="val transactionVal closed-dispute-val">
                £{" "}
                {disputeStat && disputeStat.closedCashBackDispute
                  ? disputeStat.closedCashBackDispute.$numberDecimal
                  : 0}
              </p>
            </div>
          </div>
        </div>
        <div className="transactions open-disputes-container">
          <div class="trans row space-between">
            <p class="transactionLable open-dispute-label">Open Dispute</p>
            <p class="transactionVal open-dispute-val dispute-count">
              {disputeStat && disputeStat.openDisputes
                ? disputeStat.openDisputes
                : 0}
            </p>
            <div class="row">
              <svg
                width="25"
                height="26"
                viewBox="0 0 25 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.36426 18.6409V23.8818C1.36426 24.6166 2.7802 24.906 3.27003 24.3582L7.55803 19.6583M2.16468 19.6583H23.4332C23.8752 19.6583 24.2336 19.3 24.2336 18.8579V1.57313C24.2336 1.13107 23.8752 0.772705 23.4332 0.772705H2.16468C1.72262 0.772705 1.36426 1.13107 1.36426 1.57313V18.8579C1.36426 19.3 1.72262 19.6583 2.16468 19.6583Z"
                  stroke="#1681B1"
                  stroke-width="0.952888"
                  stroke-linecap="round"
                />
                <circle
                  cx="7.08088"
                  cy="9.58845"
                  r="1.90578"
                  stroke="#1681B1"
                  stroke-width="0.762311"
                />
                <circle
                  cx="12.7977"
                  cy="9.58845"
                  r="1.90578"
                  stroke="#1681B1"
                  stroke-width="0.762311"
                />
                <circle
                  cx="18.5154"
                  cy="9.58845"
                  r="1.90578"
                  stroke="#1681B1"
                  stroke-width="0.762311"
                />
              </svg>
            </div>
          </div>
          <div class="divider" />
          <div class="row space-between">
            <div class="newCustomers ">
              <p className="lable open-dispute-label">
                Sales <br />
              </p>
              <p class="val open-dispute-val">
                £{" "}
                {disputeStat && disputeStat.openSalesDispute
                  ? disputeStat.openSalesDispute.$numberDecimal
                  : 0}
              </p>
            </div>
            <div class="divider" />
            <div class="existingCustomers">
              <p className="lable open-dispute-label">
                Cashback <br />
              </p>
              <p class="val open-dispute-val ">
                £{" "}
                {disputeStat && disputeStat.openCashBackDispute
                  ? disputeStat.openCashBackDispute.$numberDecimal
                  : 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Popup
        visible={popupActivate}
        dataSource={disputeDetails}
        showTitle={true}
        title="Dispute"
        width={1050}
        height={680}
      >
        <InfoTab
          visible={popupActivate}
          onCancel={closeTab}
          data={disputeDetails}
        />
      </Popup>
      <DataGrid dataSource={disputes} rowRender={renderGridCell}>
        <Paging enabled={false} />
        <Column caption={"Date & Time"} />
        <Column caption={"Trans.ID"} />
        <Column caption={"Customer ID"} />
        <Column caption={"Card Type"} />
        <Column caption={"Card Number"} />
        <Column caption={"Trans.Amount(£)"} />
        <Column caption={"Trans.Cashback(£)"} />
        <Column caption={"Trans.Status"} />
        <Column caption={"Dispute.Status"} />
        <Column caption={"Dispute Conversation"} />
        {/* <Column caption={""} /> */}
      </DataGrid>
    </React.Fragment>
  );
}

DisputesList.propTypes = {
  getDispute: PropTypes.func.isRequired,
  disputes: DisputesDomain.PropShape,
  isLoading: PropTypes.bool,
  getDisputeStat: PropTypes.func.isRequired,
  disputeStat: DisputeStatDomain.PropShape
};

const mapDispatchToProps = {
  getDispute: MerchantDashboard.actions.getDispute,
  getDisputeStat: MerchantDashboard.actions.getDisputeStat
};

const mapStateToProps = state => ({
  disputes: MerchantDashboard.selectors.getDispute(state),
  isLoading: MerchantDashboard.selectors.isDisputeLoading(state),
  disputeStat: MerchantDashboard.selectors.getDisputeStat(state),
  isLoading: MerchantDashboard.selectors.isDisputeStatLoading(state)
});

const connected = connect(
  mapStateToProps,
  mapDispatchToProps
);

const typeEditorOptions = { placeholder: "Category" };

export default connected(DisputesList);
