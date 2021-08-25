import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getAccessToken } from "../../../../services/src/auth-service/firebase";
import { Customers as CustomersDomain } from "../../../../business-layer/domains";
import { Customer } from "../../../../business-layer/reducers";
import PropTypes from "prop-types";

import "devextreme/data/odata/store";

import DataGrid, {
  Column,
  Pager,
  Paging,
  MasterDetail,
  FilterRow
} from "devextreme-react/data-grid";
import CustomerDetails from "./customer-details";

function CustomerList({ getCustomers, customers, onSelectCustomer }) {

  useEffect(() => {
    getAccessToken().then(token => {
      getCustomers(token, "");
    });

  }, [getCustomers]);

  return (
    <DataGrid
      className={"dx-card wide-card"}
      showBorders={false}
      focusedRowEnabled={true}
      columnAutoWidth={true}
      dataSource={customers}
      keyExpr="id"
    >
      <MasterDetail enabled={true} component={CustomerDetails} />
      <Paging defaultPageSize={25} />
      <Pager showInfo={true} />
      <FilterRow visible={true} />
      <Column dataField={"customerId"} caption={"Id"} width={70} />
      <Column dataField={"name"} caption={"Name"} />

      <Column dataField={"emailId"} caption={"Email Id"} />

      <Column dataField={"mobileNumber"} caption={"Mobile Number"} />

      <Column dataField={"createdDate"} caption={"CreatedDate"} />

      <Column dataField={"modifiedDate"} caption={"ModifiedDate"} />
    </DataGrid>
  );
}

CustomerList.propTypes = {
  getCustomers: PropTypes.func.isRequired,
  customers: CustomersDomain.PropShape,
  isLoading: PropTypes.bool
};

const mapDispatchToProps = {
  getCustomers: Customer.actions.getCustomers
};

const mapStateToProps = state => ({
  customers: Customer.selectors.getCustomers(state),
  isLoading: Customer.selectors.isLoading(state)
});

const connected = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connected(CustomerList);
