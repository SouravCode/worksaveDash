import React from "react";
import { TabPanel, Item } from "devextreme-react/tab-panel";
import InfoTab from "../info-tab";
import { cloneDeep } from "lodash";
function LocationDetails(props) {
  let data = cloneDeep(props.data);
  const info = () => {
    return <InfoTab data={data} />;
  };
  return (
    <TabPanel>
      <Item title="info" render={info} />
    </TabPanel>
  );
}

export default LocationDetails;
