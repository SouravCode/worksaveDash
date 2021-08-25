import React from "react";
function MerchantFinances() {
  let merchantOffers = [];
  let merchantAccounts = [];
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

  if (merchantOffers) {
    merchantOffers.map(merchantOffer => {
      if (merchantOffer.isPrimary && merchantOffer.status == "ACTIVE") {
        alwaysOffer = merchantOffer;
      }
    });
  }
  return (
    <React.Fragment>
      <div className="finance-container">
        <div className={"merchantDetails"}>
          <h6 className={"mb-0"}>CASHBACK DETAILS:</h6>
        </div>
        <p>
          Type:
          <span className="value">
            {alwaysOffer && alwaysOffer.offerType ? alwaysOffer.offerType : "-"}
          </span>
        </p>
        <div className="profile-flex spaceBetween">
          <p>
            {" "}
            Minimum (Always):
            <span className="value">
              {alwaysOffer && alwaysOffer.offerValue
                ? alwaysOffer.offerValue
                : "-"}
              %
            </span>
          </p>
          <p>
            wove Commission :
            <span className="value">
              {alwaysOffer && alwaysOffer.woveValue
                ? alwaysOffer.woveValue
                : "-"}
              %
            </span>
          </p>
        </div>
        <hr />
        <div className={"merchantDetails"}>
          <h6 className={"mb-0"}>INVOICING</h6>
        </div>
        <div className="profile-flex spaceBetween">
          <p>
            Invoice Frequecy:<span className="value">{"Weekly"}</span>
          </p>
          <p>
            Invoice Period:<span className="value">{"Mon - Sun"}</span>
          </p>
        </div>
        <div className="profile-flex spaceBetween">
          <p>
            Invoice Day:<span className="value">{"Monday"}</span>
          </p>
          <p>
            Payment Day:<span className="value">{"Friday"}</span>
          </p>
        </div>
        <hr />
        <div className={"merchantDetails"}>
          <h6 className={"mb-0"}> BANK DETAILS (For Direct Debit):</h6>
        </div>
        <p>
          Bank Name: <span className="value">{"-"}</span>{" "}
        </p>
        <div className="profile-flex spaceBetween">
          <p>
            Account Type:<span className="value">{"-"}</span>
          </p>
          <p>
            Account Name:
            <span className="value">
              {merchantAccounts &&
              merchantAccounts.length > 0 &&
              merchantAccounts[0].accountName
                ? merchantAccounts[0].accountName
                : ""}
            </span>
          </p>
        </div>
        <div className="profile-flex spaceBetween">
          <p>
            Account Number:
            <span className="value">
              {merchantAccounts &&
              merchantAccounts.length > 0 &&
              merchantAccounts[0].accountNumber
                ? merchantAccounts[0].accountNumber
                : ""}
            </span>
          </p>
          <p>
            Sort Code:<span className="value">{"-"}</span>
          </p>
        </div>
        <p>
          Address:<span className="value">{"-"}</span>
        </p>
      </div>
    </React.Fragment>
  );
}

export default MerchantFinances;
