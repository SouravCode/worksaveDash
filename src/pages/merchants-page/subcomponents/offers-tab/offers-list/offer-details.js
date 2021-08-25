import React from "react";
import { TabPanel, Item } from "devextreme-react/tab-panel";
import { cloneDeep } from "lodash";
import InfoTab from "../info-tab";

function UpdateOffer(props) {
  let data = cloneDeep(props.data);
  let offers = cloneDeep(props.allOffer);
  // console.log("Hello",props)

  const update = () => {
    return <InfoTab data={data} allData={offers}/>;
  };

  return (
    <TabPanel>
      <Item title="Update" render={update} />
    </TabPanel>
  );
}

export default UpdateOffer;
