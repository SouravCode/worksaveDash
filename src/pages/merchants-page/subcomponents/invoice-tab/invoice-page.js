import React, { useState } from "react";

import { InvoiceForm, InvoiceList } from "./subcomponents";
import { Button } from "devextreme-react/button";

function InvoicePage(props) {
  const data = props.data.data;
  const [isAddNewMode, setIsAddNewMode] = useState(false);
  return (
    <React.Fragment>
      <h2 className={"content-block"}>
        {" "}
        Invoices{" "}
        <Button
          icon="plus"
          text="Add New"
          type="primary"
          stylingMode="outlined"
          onClick={() => setIsAddNewMode(true)}
        />
      </h2>

      <InvoiceForm
        data={data}
        isHidden={!isAddNewMode}
        onCancel={() => setIsAddNewMode(false)}
      />
      <InvoiceList data={data} />
    </React.Fragment>
  );
}

export default InvoicePage;
