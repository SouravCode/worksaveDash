import React from "react";
import { MerchantInvoiceList } from "./subcomponents";

function MerchantTransactionsPage() {
  return (
    <React.Fragment>
      <h2 className={"content-block,flex"}>Invoices </h2>
      <MerchantInvoiceList />
    </React.Fragment>
  );
}

export default MerchantTransactionsPage;
