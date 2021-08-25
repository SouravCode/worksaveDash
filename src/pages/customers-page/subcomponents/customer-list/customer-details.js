import React from "react";
import { TabPanel, Item } from "devextreme-react/tab-panel";
import InfoTab from "../info-tab/index";
import CardsTab from "../card_details-tab/index";
import TransactionsTab from "../transactions-tab/index";
import RedeemPage from "../redeem-tab/redeem-page";
import BalancePage from "../balances-tab/index";
function CustomerDetail(props) {
  let data = props.data.data;
  const info = () => {
    return <InfoTab data={data} />;
  };
  const cardDetails = () => {
    return <CardsTab data={data} />;
  };
  const transaction = () => {
    return <TransactionsTab data={data} />;
  };
  const redeem = () => {
    return <RedeemPage data={data} />;
  };
  const balance = () => {
    return <BalancePage data={data} />;
  };
  return (
    <TabPanel>
      <Item title="Info" render={info} />
      <Item title="Card-Details" render={cardDetails} />
      <Item title="Transactions" render={transaction} />
      <Item title="Redeem" render={redeem} />
      <Item title="Balances" render={balance} />
    </TabPanel>
  );
}

export default CustomerDetail;
