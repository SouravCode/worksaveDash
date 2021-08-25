import React from "react";
import { DisputesList } from "./subcomponents";
function MerchantDisputePage() {
  return (
    <React.Fragment>
      <h3 className={"content-block"}> Disputes </h3>

      <DisputesList />
    </React.Fragment>
  );
}

export default MerchantDisputePage;
