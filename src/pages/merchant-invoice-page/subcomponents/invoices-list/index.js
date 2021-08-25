import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getAccessToken } from "../../../../services/src/auth-service/firebase";
import { MerchantInvoices as MerchantInvoicesDomain } from "../../../../business-layer/domains";
import { Merchant } from "../../../../business-layer/reducers";
import PropTypes from "prop-types";
import "devextreme/data/odata/store";
import DataGrid, {
  Column,
  Pager,
  Paging,
  SearchPanel
} from "devextreme-react/data-grid";

function InvoiceList({ getInvoice, invoices }) {
  useEffect(() => {
    const merchantDetails = localStorage.getItem("merchant")
      ? JSON.parse(localStorage.getItem("merchant"))
      : "";
    getAccessToken().then(token => {
      getInvoice(merchantDetails.id, token);
    });

  }, [getInvoice]);
  const renderGridCell = data => {
    return (
      <tbody>
        <tr>
          <td>
            <p>
              <span>{data.data.status}</span>
            </p>
          </td>
          <td>
            <p>{data.data.invoiceNumber}</p>
          </td>
          <td>
            <p>{data.data.startDate}</p>
          </td>
          <td>
            <p>{data.data.dueDate}</p>
          </td>
          <td>
            <p>{data.data.endDate}</p>
          </td>
        </tr>
      </tbody>
    );
  };
  return (
    <DataGrid
      showBorders={false}
      columnAutoWidth={true}
      dataSource={invoices}
      rowRender={renderGridCell}
    >
      <SearchPanel visible={true} width={140} placeholder="Search Invoice..." />
      <Paging defaultPageSize={8} />
      <Pager showInfo={true} />

      <Column dataField={"status"} caption={"Status"} />

      <Column
        dataField={"invoiceNumber"}
        caption={"Invoice Number"}
        width={105}
      />

      <Column dataField={"startDate"} caption={"Start Date"} />

      <Column dataField={"dueDate"} caption={"Due Date"} />

      <Column dataField={"endDate"} caption={"End Date"} />
    </DataGrid>
  );
}

InvoiceList.propTypes = {
  getInvoice: PropTypes.func.isRequired,
  invoices: MerchantInvoicesDomain.PropShape,
  isLoading: PropTypes.bool
};

const mapDispatchToProps = {
  getInvoice: Merchant.actions.getMerchantInvoice
};

const mapStateToProps = state => ({
  invoices: Merchant.selectors.getMerchantInvoice(state),
  isLoading: Merchant.selectors.isLoading(state)
});

const connected = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connected(InvoiceList);
