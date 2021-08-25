import React, { useState } from "react";
import { Button } from "devextreme-react/button";
import InvoiceList from "./subcomponents";

function InvoicePage() {
  return (
    <React.Fragment>
      <h2 className={"content-block"}> Invoices </h2>
      <InvoiceList />
    </React.Fragment>
  );
}

export default InvoicePage;
