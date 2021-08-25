import React, { useState } from "react";
import OffersList from "./offers-list/index";
import OffersForm from "./offers-form/index";
import { Button } from "devextreme-react/button";
import { cloneDeep } from "lodash";
function OffersTab(props) {
  const [isAddNewMode, setIsAddNewMode] = useState(false);
  let data = cloneDeep(props.data);
  return (
    <React.Fragment>
      <h2 className={"content-block"}>
        {" "}
        Offers{" "}
        <Button
          icon="plus"
          text="Add New"
          type="primary"
          stylingMode="outlined"
          onClick={() => setIsAddNewMode(true)}
        />
      </h2>
      <OffersForm
        data={data}
        isHidden={!isAddNewMode}
        onCancel={() => setIsAddNewMode(false)}
      />
      <OffersList data={data} />
    </React.Fragment>
  );
}
export default OffersTab;
