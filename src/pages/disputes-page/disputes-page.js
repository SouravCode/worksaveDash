import React from "react";
import { DisputesList } from "./subcomponents";
function DisputePage() {
  return (
    <React.Fragment>
      <h2 className={"content-block"}> Disputes </h2>
      <DisputesList />
    </React.Fragment>
  );
}

export default DisputePage;
