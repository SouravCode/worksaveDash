import React, { useState } from "react";

import { MerchantForm, MerchantList } from "./subcomponents";
import { Button } from "devextreme-react/button";

function MerchantsPage() {
  const [isAddNewMode, setIsAddNewMode] = useState(false);

  const onSelectMerchant = key => console.log("selected Merchant", key);

  return (
    <React.Fragment>
      <h2 className={"content-block"}>
        {" "}
        Merchants{" "}
        <Button
          icon="plus"
          text="Add New"
          type="primary"
          stylingMode="outlined"
          onClick={() => setIsAddNewMode(true)}
        />
      </h2>

      <MerchantForm
        isHidden={!isAddNewMode}
        onCancel={() => setIsAddNewMode(false)}
      />
      <MerchantList onSelectMerchant={key => onSelectMerchant(key)} />
    </React.Fragment>
  );
}

export default MerchantsPage;
