import React, { useState } from "react";
import RedeemTab from "./subcomponents";
import { cloneDeep } from "lodash";
function RedeemPage() {
  return (
    <React.Fragment>
      <h2 className={"content-block"}> Redeem Transactions </h2>
      <RedeemTab />
    </React.Fragment>
  );
}

export default RedeemPage;
