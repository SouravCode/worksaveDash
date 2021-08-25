import PropTypes from "prop-types";
import React, { useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { DateTime } from "luxon";
import { getAccessToken } from "../../../../services/src/auth-service/firebase";
import { MerchantDashboard } from "../../../../business-layer/reducers";
import { DisputeStat as DisputeStatDomain } from "../../../../business-layer/domains";
import "./dispute-view.scss";

function DisputeView({ getDisputeStat, disputeStat, data }) {
  const history = useHistory();

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
    const query = `fromDate=${data && data.startDate ? data.startDate : startDate
      }&toDate=${data && data.endDate ? data.endDate : endDate}`;
    getAccessToken().then(token => {
      getDisputeStat(merchantDetails.id, query, token);
    });

  }, [data, getDisputeStat]);

  console.log(disputeStat);

  let totalDispute = disputeStat ? disputeStat.openDisputes : 0;
  console.log(totalDispute);
  return (
    <div id="notification" className={"message"}>
      <p className="dispute-label">Total Dispute</p>
      <p className="dispute-val">{totalDispute}</p>
    </div>
  );
}

DisputeView.propTypes = {
  getDisputeStat: PropTypes.func.isRequired,
  disputeStat: DisputeStatDomain.PropShape,
  data: PropTypes.object,
  isLoading: PropTypes.bool
};

const mapDispatchToProps = {
  getDisputeStat: MerchantDashboard.actions.getDisputeStat
};

const mapStateToProps = state => ({
  disputeStat: MerchantDashboard.selectors.getDisputeStat(state),
  isDisputeStatLoading: MerchantDashboard.selectors.isDisputeStatLoading(state)
});

const connected = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connected(DisputeView);
