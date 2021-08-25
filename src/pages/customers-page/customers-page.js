import React, { useState } from "react";
import { CustomerList, CustomerFilter } from "./subcomponents";
function CustomersPage() {
  const [isAddNewMode, setIsAddNewMode] = useState(false);

  const onSelectCustomer = key => console.log("selected Customer", key);

  return (
    <React.Fragment>
      <h2 className={"content-block"}> Customers </h2>
      <CustomerFilter />
      <CustomerList onSelectCustomer={key => onSelectCustomer(key)} />
    </React.Fragment>
  );
}

export default CustomersPage;
