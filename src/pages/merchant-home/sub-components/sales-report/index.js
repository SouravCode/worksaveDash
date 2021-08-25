import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getAccessToken } from "../../../../services/src/auth-service/firebase";
import { DateTime } from "luxon";

import Chart, {
  ArgumentAxis,
  CommonSeriesSettings,
  Legend,
  Series,
  Tooltip,
  ConstantLine,
  ValueAxis,
  Label
} from "devextreme-react/chart";

import { salesReports as SalesReportDomain } from "../../../../business-layer/domains";
import { MerchantDashboard } from "../../../../business-layer/reducers";

import "./sales-report.scss";

function SalesReport({ getSalesReport, salesReport, data }) {

  useEffect(() => {
    const merchantDetails = localStorage.getItem("merchant")
      ? JSON.parse(localStorage.getItem("merchant"))
      : "";
    let startDate = DateTime.utc()
      .minus({ days: 30 })
      .startOf("day")
      .toISO();
    let endDate = DateTime.utc()
      .endOf("day")
      .toISO();
    const query = `fromDate=${data && data.startDate ? data.startDate : startDate
      }&toDate=${data && data.endDate ? data.endDate : endDate}&type=${"today"}`;

    console.log(query);
    getAccessToken().then(token => {
      getSalesReport(merchantDetails.id, query, token);
    });

  }, [data, getSalesReport]);

  function customizeTooltip(pointInfo) {
    return {
      html: `<div><div class="tooltip-header">${pointInfo.argumentText
        }</div><div class="tooltip-body"><div class="series-name">${pointInfo.points[0].seriesName
        }: </div><div class="value-text">${pointInfo.points[0].valueText
        }</div><div class="series-name">${pointInfo.points[1].seriesName
        }: </div><div class="value-text">${pointInfo.points[1].valueText
        } </div><div class="series-name">${pointInfo.points[2].seriesName
        }: </div><div class="value-text">${pointInfo.points[2].valueText
        }</div></div></div>`
    };
  }
  function customDataBinding() {
    console.log(salesReport);
    return salesReport;
  }
  return (
    <div id="transactionGraph">
      <Chart
        title="Sales Report"
        dataSource={salesReport}
        palette="Soft"
        id="chart"
      >
        {/* <CommonSeriesSettings barPadding={0}/> */}
        <Series
          name="Total sales"
          argumentField="date"
          valueField="totalSales"
          axis="frequency"
          type="bar"
          color="#FF69B4"
          barPadding={0.1}
          cornerRadius={2}
        />

        <Series
          name="Cash back"
          valueField="totalCashback"
          argumentField="date"
          type="bar"
          color="#9370DB"
          barPadding={0.1}
          cornerRadius={2}
        />
        <Series
          name="Number of Transaction"
          argumentField="date"
          valueField="totalTransactions"
          axis="transaction"
          type="line"
          color="#6b71c3"
        />

        <ArgumentAxis>
          <Label wordWrap="none" overlappingBehavior="rotate" />
        </ArgumentAxis>

        <ValueAxis name="frequency" position="left" />
        <ValueAxis name="transaction" position="right" />

        <Tooltip
          enabled={true}
          shared={true}
          customizeTooltip={customizeTooltip}
        />

        <Legend verticalAlignment="bottom" horizontalAlignment="center" />
      </Chart>
    </div>
  );
}

SalesReport.propTypes = {
  getSalesReport: PropTypes.func.isRequired,
  salesReport: SalesReportDomain.PropShape,
  data: PropTypes.object,
  isReportLoading: PropTypes.bool
};

const mapDispatchToProps = {
  getSalesReport: MerchantDashboard.actions.getSalesReport
};

const mapStateToProps = state => ({
  salesReport: MerchantDashboard.selectors.getSalesReport(state),
  isReportLoading: MerchantDashboard.selectors.isReportLoading(state)
});

const connected = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connected(SalesReport);
