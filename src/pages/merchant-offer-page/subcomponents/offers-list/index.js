import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getAccessToken } from "../../../../services/src/auth-service/firebase";
import { DateTime } from "luxon";
import { Offers as OffersDomain } from "../../../../business-layer/domains";
import { MerchantDashboard } from "../../../../business-layer/reducers";
import PropTypes from "prop-types";
import LoadIndicator from "devextreme-react/load-indicator";
import "./offers-list.scss";
import "devextreme/data/odata/store";

import DataGrid, { Column, Paging } from "devextreme-react/data-grid";

function OffersList({ getMerchantOffers, offers, isLoading }) {
  let alwaysOffer = {};
  let currentOffer = {};

  useEffect(() => {
    const merchantDetails = localStorage.getItem("merchant")
      ? JSON.parse(localStorage.getItem("merchant"))
      : "";
    getAccessToken().then(token => {
      getMerchantOffers(
        merchantDetails.id,
        merchantDetails && merchantDetails.locations.length > 0
          ? merchantDetails.locations[0].id
          : "",
        token
      );
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
        <tr>
          <td>
            <p className="offerAlign">{data.data.offerOriginalValue}</p>
          </td>
          <td>
            <p className="offerAlign">{data.data.offerValue}</p>
          </td>
          <td>
            <p className="offerAlign">
              {data.data.woveValue ? data.data.woveValue : "-"}
            </p>
          </td>
          <td>
            <p className="offerAlign">
              <span>
                {DateTime.fromISO(data.data.startDate).toFormat(
                  "dd LLL, yy HH:mm"
                )}
              </span>
            </p>
          </td>
          <td>
            <p className="offerAlign">
              {data.data && data.data.endDate
                ? DateTime.fromISO(data.data.endDate).toFormat(
                  "dd LLL, yy HH:mm"
                )
                : "-"}
            </p>
          </td>
          <td>
            {data.data.status == "ACTIVE" ? (
              <p className={" offerAlign cleared"}>{data.data.status}</p>
            ) : (
              ""
            )}
            {data.data.status == "INACTIVE" ? (
              <p className={"offerAlign declined"}>{data.data.status}</p>
            ) : (
              ""
            )}
          </td>
        </tr>
      </tbody>
    );
  };
  console.log(offers);
  return (
    <React.Fragment>
      <div className={"row space-between"}>
        <div className={"activeOffer"}>
          <div className={" transaction row space-between"}>
            <div className={"lable"}>
              <p className={"val offer-label"}>Always Offer</p>
            </div>
            <div className={"val offer-val"}>
              {alwaysOffer && alwaysOffer.offerValue
                ? alwaysOffer.offerValue
                : 0}
              %
            </div>
          </div>
          <div className="offer-dates">
            <p>
              Start Date:
              <span className="always-offer-date">
                {alwaysOffer && alwaysOffer.startDate
                  ? DateTime.fromISO(alwaysOffer.startDate).toFormat(
                    "dd LLL, yy HH:mm"
                  )
                  : "-"}
              </span>
            </p>
            <p>
              End Date:
              <span className="always-offer-date">
                {alwaysOffer && alwaysOffer.endDate
                  ? DateTime.fromISO(alwaysOffer.endDate).toFormat(
                    "dd LLL, yy HH:mm"
                  )
                  : "-"}
              </span>
            </p>
          </div>
        </div>
        <div className={"settledTransaction"}>
          <div className={" transaction row space-between "}>
            <div className={"lable"}>
              <p className={"val offer-label "}>Current Offer</p>
            </div>
            <div className={"val offer-val"}>
              {currentOffer && currentOffer.offerValue
                ? currentOffer.offerValue
                : 0}
              %
            </div>
          </div>
          <div className="offer-dates">
            <p>
              Start Date:
              <span className="current-offer-date">
                {currentOffer && currentOffer.startDate
                  ? DateTime.fromISO(currentOffer.startDate).toFormat(
                    "dd LLL, yy HH:mm"
                  )
                  : "-"}
              </span>
            </p>
            <p>
              End Date:
              <span className="current-offer-date">
                {currentOffer && currentOffer.endDate
                  ? DateTime.fromISO(currentOffer.endDate).toFormat(
                    "dd LLL, yy HH:mm"
                  )
                  : "-"}
              </span>
            </p>
          </div>
        </div>
        <div className={"totalTransaction"}>
          <div className={" transaction row space-between"}>
            <div className={"lable"}>
              <p className={"val offer-label"}>Last Offer</p>
            </div>
            <div className={"val offer-val"}>
              {offers && offers.length > 2 ? offers[2].offerValue : "0"}%
            </div>
          </div>
          <div className="offer-dates">
            <p>
              Start Date:{" "}
              <span className="last-offer-date">
                {offers && offers.length > 2
                  ? DateTime.fromISO(offers[2].startDate).toFormat(
                    "dd LLL, yy HH:mm"
                  )
                  : "-"}
              </span>
            </p>
            <p>
              End Date:
              <span className="last-offer-date">
                {offers && offers.length > 2
                  ? DateTime.fromISO(offers[2].endDate).toFormat(
                    "dd LLL, yy HH:mm"
                  )
                  : "-"}
              </span>
            </p>
          </div>
        </div>
      </div>
      <span className="dx-button-text">
        {isLoading ? (
          <LoadIndicator width={"24px"} height={"24px"} visible={true} />
        ) : (
          ""
        )}
      </span>
      <DataGrid
        dataSource={offers}
        rowRender={renderGridCell}
        disabled={isLoading}
      >
        <Paging enabled={false} />
        <Column caption={"Offer Original Value"} />
        <Column caption={"Offer Value"} />
        <Column caption={"Wove Value"} />
        <Column caption={"Start Date"} />
        <Column caption={"End Date"} />
        <Column caption={"Status"} />
      </DataGrid>
    </React.Fragment>
  );
}

OffersList.propTypes = {
  getMerchantOffers: PropTypes.func.isRequired,
  offers: OffersDomain.PropShape,
  isLoading: PropTypes.bool
};

const mapDispatchToProps = {
  getMerchantOffers: MerchantDashboard.actions.getOffer
};

const mapStateToProps = state => ({
  offers: MerchantDashboard.selectors.getOffer(state),
  isLoading: MerchantDashboard.selectors.isLoading(state)
});

const connected = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connected(OffersList);
