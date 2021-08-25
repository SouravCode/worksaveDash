import PropTypes from "prop-types";
import React, { useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";
import { getAccessToken } from "../../../../services/src/auth-service/firebase";
import { DateTime } from "luxon";
import { MerchantDashboard } from "../../../../business-layer/reducers";
import { DisputeStat as DisputeStatDomain } from "../../../../business-layer/domains";
import "./dispute-stats.scss";

function DisputeStat({ getDisputeStat, disputeStat }) {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [disputeId, setDId] = useState("");
  const [status, setState] = useState("");
  const [customerId, setId] = useState("");

  useEffect(() => {
    let input = "";

    const merchantDetails = localStorage.getItem("merchant")
      ? JSON.parse(localStorage.getItem("merchant"))
      : "";
    getAccessToken().then(token => {
      getDisputeStat(merchantDetails.id, input, token);
    });


  }, [getDisputeStat]);

  let totalDispute = disputeStat
    ? disputeStat.openDisputes + disputeStat.closedDisputes
    : 0;
  const onSuccess = () => {
    let filter = {};
    //const { fromDate, status,toDate,userId,cardLastNumbers} = formData.current;
    filter.status = status && status === "SELECT" ? "" : status;
    filter.fromDate = fromDate;
    filter.toDate = toDate;
    const merchantDetails = localStorage.getItem("merchant")
      ? JSON.parse(localStorage.getItem("merchant"))
      : "";
    getAccessToken().then(token => {
      getDisputeStat(merchantDetails.id, filter, token);
    });

  };
  const clearState = () => {
    setFromDate("");
    setToDate("");
    setState("");
    setDId("");
    const merchantDetails = localStorage.getItem("merchant")
      ? JSON.parse(localStorage.getItem("merchant"))
      : "";
    getAccessToken().then(token => {
      getDisputeStat(merchantDetails.id, {}, token);
    });

  };

  return (
    <React.Fragment>
      <form className="form-list">
        <input
          className={"filter"}
          placeholder="Search by Dispute Id"
          value={disputeId}
          onChange={text => setDId(text.target.value)}
        />
        <label>Start Date:</label>
        <input
          className={"filter"}
          type="date"
          placeholder="From Date"
          value={fromDate}
          onChange={text => setFromDate(text.target.value)}
        />
        <label>End Date:</label>
        <input
          className={"filter"}
          type="date"
          placeholder="To Date"
          value={toDate}
          onChange={text => setToDate(text.target.value)}
        />
        <select
          className={"filter"}
          value={status}
          onChange={text => setState(text.target.value)}
        >
          <option name="SELECT" value={"SELECT"}>
            SELECT
          </option>
          <option name="PENDING" value={"PENDING"}>
            PENDING
          </option>
          <option name="CLOSED" value="CLOSED">
            CLOSED
          </option>
          <option name="RESOLVED" value="RESOLVED">
            RESOLVED
          </option>
          <option name="CANCELLED" value="CANCELLED">
            CANCELLED
          </option>
        </select>
        <input
          className={"button"}
          type="button"
          value="Submit"
          onClick={onSuccess}
        />
        &nbsp;&nbsp;
        <input
          className={"reset"}
          type="reset"
          value="Reset"
          onClick={clearState}
        />
      </form>
      <div className={"row space-between"}>
        <div className={"totalDisputes"}>
          <div className={" dispute row space-between"}>
            <div className={"lable"}>
              <p>Total</p>
              <p>disputes</p>
            </div>
            <div className={"val"}>{totalDispute}</div>
          </div>
          <div className={"row"}>
            <div className={"sales"}>
              <div className={"lable"}>Sales</div>
              <div className={"val"}>
                £{" "}
                {(disputeStat &&
                  disputeStat.openSalesDispute &&
                  disputeStat.openSalesDispute.$numberDecimal
                  ? parseFloat(disputeStat.openSalesDispute.$numberDecimal)
                  : 0) +
                  (disputeStat &&
                    disputeStat.closedSalesDispute &&
                    disputeStat.closedSalesDispute.$numberDecimal
                    ? parseFloat(disputeStat.closedSalesDispute.$numberDecimal)
                    : 0)}
              </div>
            </div>
            <div className={"cashbacks"}>
              <div className={"lable"}>Cashbacks</div>
              <div className={"val"}>
                £ &nbsp;
                {disputeStat &&
                  disputeStat.openCashBackDispute &&
                  disputeStat.openCashBackDispute.$numberDecimal
                  ? parseFloat(disputeStat.openCashBackDispute.$numberDecimal)
                  : 0 + disputeStat &&
                    disputeStat.closedCashBackDispute &&
                    disputeStat.closedCashBackDispute.$numberDecimal
                    ? parseFloat(disputeStat.closedCashBackDispute.$numberDecimal)
                    : 0}
              </div>
            </div>
          </div>
        </div>
        <div className={"closedDisputes"}>
          <div className={" dispute row space-between"}>
            <div className={"lable"}>
              <p>Closed</p>
              <p>disputes</p>
            </div>
            <div className={"val"}>
              {disputeStat && disputeStat.closedDisputes
                ? disputeStat.closedDisputes
                : 0}
            </div>
          </div>
          <div className={"row"}>
            <div className={"sales"}>
              <div className={"lable"}>Sales</div>
              <div className={"val"}>
                £ &nbsp;
                {disputeStat && disputeStat.closedSalesDispute
                  ? disputeStat.closedSalesDispute.$numberDecimal
                  : 0}
              </div>
            </div>
            <div className={"cashbacks"}>
              <div className={"lable"}>Cashbacks</div>
              <div className={"val"}>
                £ &nbsp;
                {disputeStat && disputeStat.closedCashBackDispute
                  ? disputeStat.closedCashBackDispute.$numberDecimal
                  : 0}
              </div>
            </div>
          </div>
        </div>
        <div className={"openDisputes"}>
          <div className={" dispute row space-between"}>
            <div className={"lable"}>
              <p>Open</p>
              <p>disputes</p>
            </div>
            <div className={"val"}>
              {disputeStat && disputeStat.openDisputes
                ? disputeStat.openDisputes
                : 0}
            </div>
          </div>
          <div className={"row"}>
            <div className={"sales"}>
              <div className={"lable"}>Sales</div>
              <div className={"val"}>
                £ &nbsp;
                {disputeStat && disputeStat.openSalesDispute
                  ? disputeStat.openSalesDispute.$numberDecimal
                  : 0}
              </div>
            </div>
            <div className={"cashbacks"}>
              <div className={"lable"}>Cashbacks</div>
              <div className={"val"}>
                £ &nbsp;
                {disputeStat && disputeStat.openCashBackDispute
                  ? disputeStat.openCashBackDispute.$numberDecimal
                  : 0}
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

DisputeStat.propTypes = {
  getDisputeStat: PropTypes.func.isRequired,
  disputeStat: DisputeStatDomain.PropShape,
  isLoading: PropTypes.bool
};

const mapDispatchToProps = {
  getDisputeStat: MerchantDashboard.actions.getDisputeStat
};

const mapStateToProps = state => ({
  disputeStat: MerchantDashboard.selectors.getDisputeStat(state),
  isLoading: MerchantDashboard.selectors.isDisputeStatLoading(state)
});

const connected = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connected(DisputeStat);
