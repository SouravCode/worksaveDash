import React from "react";
import { TabPanel, Item } from "devextreme-react/tab-panel";
import InfoTab from "../info-tab/index";
function RedeemDetails(props) {
  console.log(props);
  let data = props.data.data;
  const info = () => {
    return <InfoTab data={data} />;
  };
  return (
    <TabPanel>
      <Item title="Update" render={info} />
    </TabPanel>
  );
}

export default RedeemDetails;
