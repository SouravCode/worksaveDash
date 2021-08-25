import PropTypes from "prop-types";
import React, { useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { DateTime } from "luxon";
import { getAccessToken } from "../../../../services/src/auth-service/firebase";
import "./sales-statistics.scss";
import LoadIndicator from "devextreme-react/load-indicator";
import { salesReports as SalesReportDomain } from "../../../../business-layer/domains";
import { MerchantDashboard } from "../../../../business-layer/reducers";
import { getMerchantDetail } from "../../../../services/src/api/models/client";
function SalesStatistics({ getSalesStats, salesStats, data, isLoading }) {
  let totalSales = 0;
  let totalCashback = 0;
  let totalTransactions = 0;
  let newCustomers = 0;
  let existingCustomers = 0;

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
      }&toDate=${data && data.endDate ? data.endDate : endDate}&type=${"today"}`;
    getAccessToken().then(token => {
      getMerchantDetail(token);
      getSalesStats(merchantDetails.id, query, token);
    });

  }, [data, getSalesStats]);

  if (salesStats) {
    salesStats.forEach(sales => {
      totalSales = totalSales + parseFloat(sales.totalSales);
      totalCashback = totalCashback + parseFloat(sales.totalCashback);
      totalTransactions =
        totalTransactions + parseFloat(sales.totalTransactions);
      newCustomers = newCustomers + parseFloat(sales.newCustomers);
      existingCustomers =
        existingCustomers + parseFloat(sales.existingCustomers);
    });
  }
  return (
    <div id="salesReport" class="row space-between">
      <div class="sales">
        <div class="row space-between">
          <p class="salesLable">Sales</p>
          <span className="dx-button-text">
            {isLoading ? (
              <LoadIndicator width={"24px"} height={"24px"} visible={true} />
            ) : (
              ""
            )}
          </span>
          <div>
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="36"
                height="36"
                rx="9"
                fill="#F5A2BF"
                fillOpacity="0.4"
              />
              <mask id="path-2-inside-1" fill="white">
                <path d="M28.125 17.4375C28.125 19.5513 27.4982 21.6176 26.3238 23.3752C25.1495 25.1327 23.4803 26.5026 21.5274 27.3115C19.5745 28.1204 17.4256 28.332 15.3525 27.9196C13.2793 27.5073 11.375 26.4894 9.8803 24.9947C8.38562 23.5 7.36774 21.5957 6.95536 19.5225C6.54298 17.4494 6.75463 15.3005 7.56354 13.3476C8.37245 11.3947 9.74229 9.72553 11.4998 8.55117C13.2574 7.37681 15.3237 6.75 17.4375 6.75L17.4375 17.4375H28.125Z" />
              </mask>
              <path
                d="M28.125 17.4375C28.125 19.5513 27.4982 21.6176 26.3238 23.3752C25.1495 25.1327 23.4803 26.5026 21.5274 27.3115C19.5745 28.1204 17.4256 28.332 15.3525 27.9196C13.2793 27.5073 11.375 26.4894 9.8803 24.9947C8.38562 23.5 7.36774 21.5957 6.95536 19.5225C6.54298 17.4494 6.75463 15.3005 7.56354 13.3476C8.37245 11.3947 9.74229 9.72553 11.4998 8.55117C13.2574 7.37681 15.3237 6.75 17.4375 6.75L17.4375 17.4375H28.125Z"
                fill="#FC85AE"
                stroke="#FC85AE"
                strokeWidth="2.25"
                mask="url(#path-2-inside-1)"
              />
              <mask id="path-3-inside-2" fill="white">
                <path d="M20.0148 4.66438C21.4182 4.68596 22.8035 4.98373 24.0918 5.5407C25.38 6.09766 26.546 6.90292 27.523 7.91048C28.5001 8.91805 29.2691 10.1082 29.7862 11.413C30.3033 12.7177 30.5583 14.1116 30.5368 15.5149L19.8505 15.3506L20.0148 4.66438Z" />
              </mask>
              <path
                d="M20.0148 4.66438C21.4182 4.68596 22.8035 4.98373 24.0918 5.5407C25.38 6.09766 26.546 6.90292 27.523 7.91048C28.5001 8.91805 29.2691 10.1082 29.7862 11.413C30.3033 12.7177 30.5583 14.1116 30.5368 15.5149L19.8505 15.3506L20.0148 4.66438Z"
                stroke="#FC85AE"
                strokeWidth="1.125"
                mask="url(#path-3-inside-2)"
              />
            </svg>
          </div>
        </div>
        <p class="salesVal">
          £ {totalSales ? parseFloat(totalSales).toFixed(2) : 0}
        </p>
      </div>
      <div class="cashbacks">
        <div class="row space-between">
          <p class="cashbackLable">Cashback</p>
          <div>
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="36"
                height="36"
                rx="8"
                fill="#F5A2BF"
                fillOpacity="0.4"
              />
              <mask id="path-2-inside-1" fill="white">
                <path d="M28.125 17.4375C28.125 19.5513 27.4982 21.6176 26.3238 23.3752C25.1495 25.1327 23.4803 26.5026 21.5274 27.3115C19.5745 28.1204 17.4256 28.332 15.3525 27.9196C13.2793 27.5073 11.375 26.4894 9.8803 24.9947C8.38562 23.5 7.36774 21.5957 6.95536 19.5225C6.54298 17.4494 6.75463 15.3005 7.56354 13.3476C8.37245 11.3947 9.74229 9.72553 11.4998 8.55117C13.2574 7.37681 15.3237 6.75 17.4375 6.75L17.4375 17.4375H28.125Z" />
              </mask>
              <path
                d="M28.125 17.4375C28.125 19.5513 27.4982 21.6176 26.3238 23.3752C25.1495 25.1327 23.4803 26.5026 21.5274 27.3115C19.5745 28.1204 17.4256 28.332 15.3525 27.9196C13.2793 27.5073 11.375 26.4894 9.8803 24.9947C8.38562 23.5 7.36774 21.5957 6.95536 19.5225C6.54298 17.4494 6.75463 15.3005 7.56354 13.3476C8.37245 11.3947 9.74229 9.72553 11.4998 8.55117C13.2574 7.37681 15.3237 6.75 17.4375 6.75L17.4375 17.4375H28.125Z"
                stroke="#9E579D"
                strokeOpacity="0.7"
                strokeWidth="2"
                mask="url(#path-2-inside-1)"
              />
              <mask id="path-3-inside-2" fill="white">
                <path d="M20.0148 4.66438C21.4182 4.68596 22.8035 4.98373 24.0918 5.5407C25.38 6.09766 26.546 6.90292 27.523 7.91048C28.5001 8.91805 29.2691 10.1082 29.7862 11.413C30.3033 12.7177 30.5583 14.1116 30.5368 15.5149L19.8505 15.3506L20.0148 4.66438Z" />
              </mask>
              <path
                d="M20.0148 4.66438C21.4182 4.68596 22.8035 4.98373 24.0918 5.5407C25.38 6.09766 26.546 6.90292 27.523 7.91048C28.5001 8.91805 29.2691 10.1082 29.7862 11.413C30.3033 12.7177 30.5583 14.1116 30.5368 15.5149L19.8505 15.3506L20.0148 4.66438Z"
                fill="#9E579D"
                fillOpacity="0.7"
                stroke="#9E579D"
                strokeOpacity="0.7"
                mask="url(#path-3-inside-2)"
              />
            </svg>
          </div>
        </div>
        <p class="cashbackVal">
          £ {totalCashback ? parseFloat(totalCashback).toFixed(2) : 0}
        </p>
      </div>
      <div class="transactions">
        <div class="trans row space-between">
          <p class="transactionLable">Transactions</p>
          <p class="transactionVal">{totalTransactions}</p>
          <div class="row">
            <svg
              width="37"
              height="36"
              viewBox="0 0 37 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.00292969"
                width="36"
                height="36"
                rx="4"
                fill="#CBC7E6"
              />
              <circle cx="17.5029" cy="10.5" r="5" stroke="#5243AA" />
              <path
                d="M28.5029 25.5661V26C28.5029 28.4853 26.4882 30.5 24.0029 30.5H12.0029C9.51765 30.5 7.50293 28.4853 7.50293 26V25.5661C7.50293 23.2387 9.27766 21.2953 11.5955 21.0846L17.5955 20.5391C17.8666 20.5145 18.1393 20.5145 18.4103 20.5391L24.4103 21.0846C26.7282 21.2953 28.5029 23.2387 28.5029 25.5661Z"
                stroke="#5243AA"
              />
            </svg>
          </div>
        </div>
        <div class="divider" />
        <div class="row space-between">
          <div class="newCustomers ">
            <p class="lable">
              New <br /> Customers
            </p>
            <p class="val">{newCustomers}</p>
          </div>
          <div class="divider" />
          <div class="existingCustomers">
            <p class="lable">
              Existing <br />
              Customers
            </p>
            <p class="val">{existingCustomers}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

SalesStatistics.propTypes = {
  getSalesStats: PropTypes.func.isRequired,
  salesStats: SalesReportDomain.PropShape,
  data: PropTypes.object,
  isLoading: PropTypes.bool
};

const mapDispatchToProps = {
  getSalesStats: MerchantDashboard.actions.getSalesStats
};

const mapStateToProps = state => ({
  salesStats: MerchantDashboard.selectors.getSalesStats(state),
  isLoading: MerchantDashboard.selectors.isLoading(state)
});

const connected = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connected(SalesStatistics);
