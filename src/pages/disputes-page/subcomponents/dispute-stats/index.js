import PropTypes from "prop-types";
import React, { useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";
import { DateTime } from "luxon";
import { getAccessToken } from "../../../../../../services/src/auth-service/firebase";
import { MerchantDashboard } from "../../../../business-layer/reducers";
import { DisputeStat as DisputeStatDomain } from "../../../../business-layer/domains";
import "./dispute-stats.scss";

const disputeStatus = ["PENDING", "CLOSED", "RESOLVED", "CANCELLED"];
function DisputeStat({ getDisputeStat, disputeStat }) {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [cardLastNumbers, setCustomer] = useState("");
  const [status, setState] = useState("");
  const [userId, setId] = useState("");
  const [merchantId, setMerchantId] = useState("");
  var input = {};

  useEffect(() => {
    getAccessToken().then(token => {
      getDisputeStat(0, input, token);
    });

  }, [getDisputeStat]);

  let totalDispute = disputeStat
    ? disputeStat.openDisputes + disputeStat.closedDisputes
    : 0;
  const onSuccess = () => {
    let filter = {};

    filter.status = status && status === "SELECT" ? "" : status;
    filter.fromDate = fromDate;
    filter.toDate = toDate;
    filter.merchantId = 0;
    filter.userId = userId;
    filter.cardLastNumbers = cardLastNumbers;
    getAccessToken().then(token => {
      getDisputeStat(0, filter, token);
    });

  };
  const clearState = () => {
    setFromDate("");
    setCustomer("");
    setToDate("");
    setState("");
    setId("");
    setMerchantId("");
    getAccessToken().then(token => {
      getDisputeStat(0, {}, token);
    });

  };
  return (
    <React.Fragment>
      <form>
        <input
          className={"filter"}
          placeholder="Search by Merchant Id"
          value={merchantId}
          onChange={text => setMerchantId(text.target.value)}
        />
        <input
          className={"filter"}
          placeholder="Search by Customer Id"
          value={userId}
          onChange={text => setId(text.target.value)}
        />
        <input
          className={"filter"}
          placeholder="Search by Customer 4 digit"
          value={cardLastNumbers}
          onChange={text => setCustomer(text.target.value)}
        />
        <label>Start Date:</label>
        <input
          className={"filter"}
          type="date"
          placeholder="Start Date"
          value={fromDate}
          onChange={text => setFromDate(text.target.value)}
        />
        <label>End Date:</label>
        <input
          className={"filter"}
          type="date"
          placeholder="End Date"
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
                £
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
                £
                {disputeStat && disputeStat.closedSalesDispute
                  ? disputeStat.closedSalesDispute.$numberDecimal
                  : 0}
              </div>
            </div>
            <div className={"cashbacks"}>
              <div className={"lable"}>Cashbacks</div>
              <div className={"val"}>
                £
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
                £
                {disputeStat && disputeStat.openSalesDispute
                  ? disputeStat.openSalesDispute.$numberDecimal
                  : 0}
              </div>
            </div>
            <div className={"cashbacks"}>
              <div className={"lable"}>Cashbacks</div>
              <div className={"val"}>
                £
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
