import React, { useState } from "react";
import LocationCuisineList from "./location-cuisine-list/index";
import LocationCuisineForm from "./location-cuisine-form/index";
import { Button } from "devextreme-react/button";
import { cloneDeep } from "lodash";
function LocationCuisineTab(props) {
  const [isAddNewMode, setIsAddNewMode] = useState(false);
  let data = cloneDeep(props.data);
  return (
    <React.Fragment>
      <h2 className={"content-block"}>
        {" "}
        Cuisines{" "}
        <Button
          icon="plus"
          text="Add New"
          type="primary"
          stylingMode="outlined"
          onClick={() => setIsAddNewMode(true)}
        />
      </h2>
      <LocationCuisineForm
        data={data}
        isHidden={!isAddNewMode}
        onCancel={() => setIsAddNewMode(false)}
      />

      <LocationCuisineList data={data} />
    </React.Fragment>
  );
}
export default LocationCuisineTab;
