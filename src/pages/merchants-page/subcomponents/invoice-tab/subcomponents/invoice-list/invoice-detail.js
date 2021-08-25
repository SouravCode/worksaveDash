import React from "react";
import { TabPanel, Item } from "devextreme-react/tab-panel";
import { cloneDeep } from "lodash";
import InfoTab from "../info-tab";

function UpdateInvoice(props) {
  let data = cloneDeep(props.data);

  const update = () => {
    return <InfoTab data={data} />;
  };

  return (
    <TabPanel>
      <Item title="Update" render={update} />
    </TabPanel>
  );
}

export default UpdateInvoice;
