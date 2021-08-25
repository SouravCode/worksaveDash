import React from "react";
import { TransactionList } from "./subcomponents";

function MerchantTransactionsPage() {
  return (
    <React.Fragment>
      <h2 className={"content-block,flex"}>Transactions </h2>
      <TransactionList />
    </React.Fragment>
  );
}

export default MerchantTransactionsPage;
