import React from "react";
import OffersList from "./subcomponents";

function MerchantOffersPage() {
  return (
    <React.Fragment>
      <h2 className={"content-block,flex"}>Offers </h2>
      <OffersList />
    </React.Fragment>
  );
}

export default MerchantOffersPage;
