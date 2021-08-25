import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { getAccessToken } from "../../../../services/src/auth-service/firebase";
import DataGrid, { Column, Paging } from "devextreme-react/data-grid";
import { DateTime } from "luxon";

import "./offers-list.scss";
import { Offers as OffersReportDomain } from "../../../../business-layer/domains";
import { MerchantDashboard } from "../../../../business-layer/reducers";

function OffersList({ getMerchantOffers, offers }) {
  const history = useHistory();
  let alwaysOffer = {};
  let currentOffer = {};
  useEffect(() => {
    const merchantDetails = localStorage.getItem("merchant")
      ? JSON.parse(localStorage.getItem("merchant"))
      : "";
    const locationId =
      merchantDetails && merchantDetails.locations.length > 0
        ? merchantDetails.locations[0].id
        : "";
    getAccessToken().then(token => {
      getMerchantOffers(merchantDetails.id, locationId, token);
    });

  }, [getMerchantOffers]);

  if (offers) {
    offers.map(offer => {
      if (offer.isPrimary && offer.status == "ACTIVE") {
        alwaysOffer = offer;
      } else if (!offer.isPrimary && offer.status == "ACTIVE") {
        currentOffer = offer;
      }
    });
  }
  const renderGridCell = data => {
    return (
      <tbody>
        <tr className={"gridCell"}>
          <td>
            <p>
              <span>{data.data.startDate}</span>
            </p>
          </td>
          <td>
            <p>{data.data && data.data.endDate ? data.data.endDate : "-"}</p>
          </td>
          <td>
            <p>{data.data.offerValue}</p>
          </td>
        </tr>
      </tbody>
    );
  };

  return (
    <div id="OffersSection">
      <div class="offer-container">
        <div class="row space-between">
          <p class="offerLable">
            {currentOffer && currentOffer.offerValue
              ? "Current Offer"
              : "Always Offer"}
          </p>
          <div>
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.5117 0.450748C17.7875 0.196182 18.2125 0.196181 18.4883 0.450748L21.5889 3.3126C21.7629 3.47318 22.0047 3.53797 22.2356 3.48589L26.3517 2.55773C26.7178 2.47517 27.086 2.68771 27.1975 3.04607L28.4518 7.07479C28.5222 7.30084 28.6992 7.47785 28.9252 7.54822L32.9539 8.80246C33.3123 8.91402 33.5248 9.28216 33.4423 9.64829L32.5141 13.7644C32.462 13.9953 32.5268 14.2371 32.6874 14.4111L35.5493 17.5117C35.8038 17.7875 35.8038 18.2125 35.5493 18.4883L32.6874 21.5889C32.5268 21.7629 32.462 22.0047 32.5141 22.2356L33.4423 26.3517C33.5248 26.7178 33.3123 27.086 32.9539 27.1975L28.9252 28.4518C28.6992 28.5222 28.5222 28.6992 28.4518 28.9252L27.1975 32.9539C27.086 33.3123 26.7178 33.5248 26.3517 33.4423L22.2356 32.5141C22.0047 32.462 21.7629 32.5268 21.5889 32.6874L18.4883 35.5493C18.2125 35.8038 17.7875 35.8038 17.5117 35.5493L14.4111 32.6874C14.2371 32.5268 13.9953 32.462 13.7644 32.5141L9.64829 33.4423C9.28216 33.5248 8.91402 33.3123 8.80246 32.9539L7.54822 28.9252C7.47785 28.6992 7.30084 28.5222 7.07479 28.4518L3.04607 27.1975C2.68771 27.086 2.47517 26.7178 2.55773 26.3517L3.48589 22.2356C3.53797 22.0047 3.47318 21.7629 3.3126 21.5889L0.450748 18.4883C0.196182 18.2125 0.196181 17.7875 0.450748 17.5117L3.3126 14.4111C3.47318 14.2371 3.53797 13.9953 3.48589 13.7644L2.55773 9.64829C2.47517 9.28216 2.68771 8.91402 3.04607 8.80246L7.07479 7.54822C7.30084 7.47785 7.47785 7.30084 7.54822 7.07479L8.80246 3.04607C8.91402 2.68771 9.28216 2.47517 9.64829 2.55773L13.7644 3.48589C13.9953 3.53797 14.2371 3.47318 14.4111 3.3126L17.5117 0.450748Z"
                fill="url(#paint0_linear)"
              />
              <circle
                cx="14.7598"
                cy="13.3199"
                r="3.6"
                stroke="white"
                stroke-width="0.72"
              />
              <circle
                cx="22.6797"
                cy="23.3999"
                r="3.6"
                stroke="white"
                stroke-width="0.72"
              />
              <line
                x1="24.1669"
                y1="14.9757"
                x2="11.6633"
                y2="23.7308"
                stroke="white"
                stroke-width="0.96"
              />
              <defs>
                <linearGradient
                  id="paint0_linear"
                  x1="36"
                  y1="0"
                  x2="-5.88422"
                  y2="26.8059"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#14F1D9" />
                  <stop offset="1" stop-color="#3672F8" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
        <p class="offerVal">
          {" "}
          {currentOffer && currentOffer.offerValue
            ? currentOffer.offerValue
            : alwaysOffer.offerValue}
          %{" "}
        </p>
      </div>
    </div>
  );
}

OffersList.propTypes = {
  getMerchantOffers: PropTypes.func.isRequired,
  offers: OffersReportDomain.PropShape,
  isLoading: PropTypes.bool
};

const mapDispatchToProps = {
  getMerchantOffers: MerchantDashboard.actions.getOffer
};

const mapStateToProps = state => ({
  offers: MerchantDashboard.selectors.getOffer(state),
  isOfferLoading: MerchantDashboard.selectors.isOfferLoading(state)
});

const connected = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connected(OffersList);
