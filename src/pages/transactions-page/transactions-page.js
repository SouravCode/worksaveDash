import React from "react";
import TransactionList from "./subcomponents/index";
import TransactionFilter from "./subcomponents/transaction-filter";

function TransactionPage() {
  return (
    <React.Fragment>
      <h2 className={"content-block"}>Transactions</h2>
      <TransactionFilter />
      <TransactionList />
    </React.Fragment>
  );
}
export default TransactionPage;
