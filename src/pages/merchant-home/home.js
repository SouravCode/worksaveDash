import React, { useEffect, useState, useRef } from "react";
import { DateTime } from "luxon";
import Form, { Item, ButtonItem, ButtonOptions } from "devextreme-react/form";
import { getAccessToken } from "../../services/src/auth-service/firebase";
import {
  getMerchantDetail,
  resetPassword
} from "../../services/src/api/models/client";
import "./home.scss";
import { useHistory } from "react-router-dom";
import appInfo from "../../app-info";

import {
  SalesStatistics,
  DisputeView,
  SalesReport,
  TransactionList,
  OffersList,
  InvoiceList
} from "./sub-components";

function MerchantHome() {
  let visible = true;
  const [StatsData, setStatsDate] = useState({});
  const [transactionData, setTransDate] = useState({});
  const [formData, setformData] = useState(useRef({}));
  const [reportData, setReportDate] = useState({});
  const [activeTab, setActiveTab] = useState("today");
  const [showCustomTab, setCustomTab] = useState(false);
  const [disputeData, setDisputeDate] = useState({});
  const colCount = 2;
  const colWidth = 300;
  const history = useHistory();
  let merchantAccounts = [];
  const merchantDetails = localStorage.getItem("merchant")
    ? JSON.parse(localStorage.getItem("merchant"))
    : "";
  if (
    merchantDetails &&
    merchantDetails.accounts &&
    merchantDetails.accounts.length > 0
  ) {
    merchantAccounts = merchantDetails.accounts;
  }
  const getTodayReport = () => {
    setActiveTab("today");
    setCustomTab(false);
    setStatsDate({
      startDate: DateTime.utc()
        .startOf("day")
        .toISO(),
      endDate: DateTime.utc()
        .endOf("day")
        .toISO()
    });
    setTransDate({
      startDate: DateTime.utc()
        .startOf("day")
        .toISO(),
      endDate: DateTime.utc()
        .endOf("day")
        .toISO()
    });
    setReportDate({
      startDate: DateTime.utc()
        .minus({ days: 30 })
        .startOf("day")
        .toISO(),
      endDate: DateTime.utc()
        .endOf("day")
        .toISO()
    });
    setDisputeDate({
      startDate: DateTime.utc()
        .startOf("day")
        .toISO(),
      endDate: DateTime.utc()
        .endOf("day")
        .toISO()
    });
  };
  const getYestrdayReport = () => {
    setCustomTab(false);
    setActiveTab("yesterday");
    setStatsDate({
      startDate: DateTime.utc()
        .minus({ days: 1 })
        .startOf("day")
        .toISO(),
      endDate: DateTime.utc()
        .minus({ days: 1 })
        .endOf("day")
        .toISO()
    });
    setTransDate({
      startDate: DateTime.utc()
        .minus({ days: 1 })
        .startOf("day")
        .toISO(),
      endDate: DateTime.utc()
        .minus({ days: 1 })
        .endOf("day")
        .toISO()
    });
    setDisputeDate({
      startDate: DateTime.utc()
        .minus({ days: 1 })
        .startOf("day")
        .toISO(),
      endDate: DateTime.utc()
        .minus({ days: 1 })
        .endOf("day")
        .toISO()
    });
    setReportDate({
      startDate: DateTime.utc()
        .minus({ days: 31 })
        .startOf("day")
        .toISO(),
      endDate: DateTime.utc()
        .minus({ days: 1 })
        .endOf("day")
        .toISO()
    });
  };
  const getCustomReport = () => {
    let start = formData.current.startDate
      ? DateTime.fromISO(formData.current.startDate.toISOString())
        .startOf("day")
        .toISO()
      : "";
    let end = formData.current.endDate
      ? DateTime.fromISO(formData.current.endDate.toISOString())
        .startOf("day")
        .toISO()
      : "";
    start = start.replace("+05:30", "Z");
    end = end.replace("00:00:00.000+05:30", "23:59:59.999Z");

    setStatsDate({
      startDate: start,
      endDate: end
    });
    setTransDate({
      startDate: start,
      endDate: end
    });
    setReportDate({
      startDate: start,
      endDate: end
    });
    setDisputeDate({
      startDate: start,
      endDate: end
    });
  };
  let form = useRef({});
  const clearState = () => {
    setformData(form);
  };
  const onReset = () => {
    if (formData && formData.current) {
      setformData(
        delete formData.current.startDate,
        delete formData.current.endDate
      );
      console.log(formData);
    }
    clearState();
  };
  const showCustomFilter = () => {
    onReset();
    setActiveTab("custom");
    setCustomTab(true);
  };
  const onProfilePage = () => {
    history.push("/profile");
  };
  return (
    <React.Fragment>
      <h2 className={"content-block,flex"}>
        Dashboard
        <p onClick={() => onProfilePage()} className="toasts">
          {merchantAccounts &&
            merchantAccounts.length > 0 &&
            merchantAccounts[0].status == "INACTIVE"
            ? "Click Here"
            : ""}
        </p>
        <p className="toast">
          {merchantAccounts &&
            merchantAccounts.length > 0 &&
            merchantAccounts[0].status == "INACTIVE"
            ? `${"  "} Note:- Add Bank Details in Profile`
            : ""}
        </p>
      </h2>
      <div className={"pills row"}>
        <p
          className={`${activeTab === "today" ? "activePill" : ""}`}
          onClick={getTodayReport}
        >
          Today
        </p>
        <p
          className={`${activeTab === "yesterday" ? "activePill" : ""}`}
          onClick={getYestrdayReport}
        >
          Yesterday
        </p>
        <p
          className={`${activeTab === "custom" ? "activePill" : ""}`}
          onClick={showCustomFilter}
        >
          Custom
        </p>
      </div>
      <div style={{ display: showCustomTab ? "block" : "none" }}>
        <Form
          className={"content-block"}
          formData={formData.current}
          colCount={3}
        >
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
              onClick={getCustomReport}
              type={"filter"}
              width={"100%"}
              text={"submit"}
              className={"custom-button"}
            />
          </ButtonItem>
        </Form>
      </div>
      <div className={"dashboard"}>
        <OffersList />
        <SalesStatistics data={StatsData} />
        <InvoiceList />
        <DisputeView data={disputeData} />
        <SalesReport data={reportData} />
        <TransactionList data={transactionData} />
      </div>
    </React.Fragment>
  );
}

export default MerchantHome;
