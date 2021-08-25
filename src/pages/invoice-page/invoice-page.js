import React, { useState } from "react";
import InvoiceList from "./index";
function InvoicePage() {
  return (
    <React.Fragment>
      <h2 className={"content-block"}> Invoices </h2>
      <InvoiceList />
    </React.Fragment>
  );
}

export default InvoicePage;
