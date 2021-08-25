import React from "react";
import { TabPanel, Item } from "devextreme-react/tab-panel";
import { cloneDeep } from "lodash";
import AddressTab from "../address-tab/index";
import InfoTab from "../info-tab/index";
import OffersTab from "../offers-tab/offers-page";
import TransactionTab from "../transaction-tab/index";
import InvoicePage from "../invoice-tab/invoice-page";
import ProductsTab from "../products/product-tab";
import AccountsTab from "../account-details-tab";
import LocationDetails from "../location-details-tab/index";
import LocationCuisineTab from "../location-cuisine-tab/location-cuisine-page";

function MasterDetail(props) {
  let data = cloneDeep(props.data);

  const info = () => {
    return <InfoTab data={data} />;
  };

  const address = () => {
    return <AddressTab data={data} />;
  };

  const offers = () => {
    return <OffersTab data={data} />;
  };

  const transactions = () => {
    return <TransactionTab data={data} />;
  };

  const invoices = () => {
    return <InvoicePage data={data} />;
  };

  const products = () => {
    return <ProductsTab data={data} />;
  };
  const Account = () => {
    return <AccountsTab data={data} />;
  };
  const locationDetails = () => {
    return <LocationDetails data={data} />;
  };
  const locationCuisine = () => {
    return <LocationCuisineTab data={data} />;
  };
  return (
    <TabPanel>
      <Item title="Info" render={info} />
      <Item title="Location" render={address} />
      <Item title="Location Details" render={locationDetails} />
      <Item title="Location Cuisine" render={locationCuisine} />
      <Item title="Offers" render={offers} />
      <Item title="Transactions" render={transactions} />
      <Item title="Invoices" render={invoices} />
      <Item title="Products" render={products} />
      <Item title="Account Details" render={Account} />
    </TabPanel>
  );
}

export default MasterDetail;
