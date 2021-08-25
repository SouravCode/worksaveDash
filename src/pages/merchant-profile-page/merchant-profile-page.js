import React, { useEffect, useState } from "react";
import {
  MerchantProfile,
  MerchantOperation,
  MerchantFinances,
  MerchantTechnology,
  MerchantOthers
} from "./subcomponents";
import Form, { ButtonItem, ButtonOptions } from "devextreme-react/form";
import { getAccessToken } from "../../services/src/auth-service/firebase";
import LoadIndicator from "devextreme-react/load-indicator";
import { TabPanel, Item } from "devextreme-react/tab-panel";
import { loadStripe } from "@stripe/stripe-js";
import { getStripeSessionDetails } from "../../services/src/api/models/client";
const stripePromise = loadStripe(
  "pk_test_51Hv1STIOgqAJBRO35YU9uxJdBrswdTPQV8eU1Qj2K6HRDe9PJLkPESR8hL3XcAi5dijLuhgwdYA7BDoPa4olq8Uj00wU3fpIPZ"
);
function MerchantProfilePage() {
  const [loading, setLoading] = useState(false);
  let merchantAccounts = [];
  let merchantOffers = [];
  let alwaysOffer = {};
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

  if (
    merchantDetails &&
    merchantDetails.locations &&
    merchantDetails.locations.length > 0 &&
    merchantDetails.locations[0].offers &&
    merchantDetails.locations[0].offers.length > 0
  ) {
    merchantOffers = merchantDetails.locations[0].offers;
  }
  const checkOut = async () => {
    setLoading(true);
    const stripe = await stripePromise;
    const merchantAccountObjId = merchantDetails.accounts[0].id;
    const {
      id: merchantObjId,
      remotePaymentSystemId: stripeCustomerId
    } = merchantDetails;
    console.log({ stripeCustomerId, merchantObjId, merchantAccountObjId });
    const token = await getAccessToken();
    const sessionDetails = await getStripeSessionDetails(
      token,
      { stripeCustomerId, merchantObjId, merchantAccountObjId }
    );
    
    setLoading(false);
    console.log(sessionDetails);
    if (sessionDetails) {
      const result = await stripe.redirectToCheckout({
        sessionId: sessionDetails.data.id
      });
      setLoading(false);
      if (result.error) {
        alert(result.error.message);
        setLoading(false);
      }
    }
  };
  if (merchantOffers) {
    merchantOffers.map(merchantOffer => {
      if (merchantOffer.isPrimary && merchantOffer.status == "ACTIVE") {
        alwaysOffer = merchantOffer;
      }
    });
  }
  const Details = () => {
    return <MerchantProfile />;
  };

  const Operations = () => {
    return <MerchantOperation />;
  };

  const Finances = () => {
    return <MerchantFinances />;
  };

  const Technology = () => {
    return <MerchantTechnology />;
  };

  const Others = () => {
    return <MerchantOthers />;
  };

  return (
    <React.Fragment>
      {merchantAccounts &&
        merchantAccounts.length > 0 &&
        merchantAccounts[0].status !== "INACTIVE" ? (
        ""
      ) : (
        <Form colCount={3}>
          <Item />
          <Item />
          <ButtonItem>
            <ButtonOptions type={"default"} width={"100%"} onClick={checkOut}>
              <span className="dx-button-text">
                {loading ? (
                  <LoadIndicator
                    width={"24px"}
                    height={"24px"}
                    visible={true}
                  />
                ) : (
                  "  Add Account Details"
                )}
              </span>
            </ButtonOptions>
          </ButtonItem>
        </Form>
      )}
      <h2 className={"content-block"}>Profile</h2>
      <div className={"row space-between profile-top-container"}>
        <div className={"always-offer-container"}>
          <p className={"header"}>ALWAYS Offer %</p>
          <div className={"flex"}>
            <p>
              <span className="always-offer-label">Customer:</span>
              <span className="value">
                {alwaysOffer && alwaysOffer.offerValue
                  ? alwaysOffer.offerValue
                  : "-"}
                %
              </span>
            </p>
            <div className="divider" />
            <p>
              <span className="always-offer-label">Wove</span>
              <span className="value">
                {alwaysOffer && alwaysOffer.woveValue
                  ? alwaysOffer.woveValue
                  : "-"}
                %
              </span>
            </p>
          </div>
        </div>
        <div className={"invoice-frequency-container"}>
          <p className={"header"}>
            <span className="frequency-label">Invoice Frequency:</span>
            <span>{"Weekly (Mon - Sun)"}</span>
          </p>
          <div className={"flex"}>
            <p>
              <span className="invoice-label">Billing:</span>
              <span className="invoice-val">
                {" "}
                <span className="value">{"Monday"}</span>
              </span>
            </p>
            <div className="divider" />
            <p>
              <span className="invoice-label">Payment:</span>
              <span className="invoice-val">
                {" "}
                <span className="value">{"Friday"}</span>
              </span>
            </p>
          </div>
        </div>
        <div className={"payment-container"}>
          <p className={"header"}>Direct Debit</p>
          <p>
            <span className="direct-option">Bank A/c:</span>
            <span className="value">
              {merchantAccounts &&
                merchantAccounts.length > 0 &&
                merchantAccounts[0].accountNumber
                ? merchantAccounts[0].accountNumber
                : "-"}
            </span>
          </p>
        </div>
      </div>
      <TabPanel>
        <Item title="Details" render={Details} />
        <Item title="Operations" render={Operations} />
        <Item title="Finances" render={Finances} />
        <Item title="Technology" render={Technology} />
        <Item title="Others" render={Others} />
      </TabPanel>
    </React.Fragment>
  );
}
export default MerchantProfilePage;
