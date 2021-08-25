import React, { useState } from "react";
import RedeemTab from "./subcomponents";
import { cloneDeep } from "lodash";
function RedeemPage(data) {
  let details = cloneDeep(data.data);
  return (
    <React.Fragment>
      <RedeemTab data={details} />
    </React.Fragment>
  );
}

export default RedeemPage;
