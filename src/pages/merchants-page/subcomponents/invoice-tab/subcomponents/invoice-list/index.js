import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { DateTime } from "luxon";
import "devextreme/data/odata/store";
import DataGrid, {
  Button,
  Column,
  Paging,
  MasterDetail
} from "devextreme-react/data-grid";
import { PDFURI } from "../../../../../../app-config";
import { cloneDeep } from "lodash";
import updateInvoice from "../invoice-list/invoice-detail";

function InvoiceList({ data }) {
  let id = data.id;
  console.log(data);
  data.invoices.forEach(invoice => {
    invoice.account = data.accounts;
  });
  const invoiceUrl = data => {
    return (
      <a href={`${PDFURI}${data.value}`} target="_blank">
        Link
      </a>
    );
  };
  const invoiceAmount = data => {
    console.log(data);
    return <td>{parseFloat(data.value).toFixed(2)}</td>;
  };

  const invoiceDetails = cloneDeep(data.invoices);
  invoiceDetails.map(e => {
    let startDate = DateTime.fromISO(e.startDate).toFormat("dd LLL yyyy");
    let endDate = DateTime.fromISO(e.endDate, { zone: "utc" }).toFormat(
      "dd LLL yyyy"
    );
    let dueDate = DateTime.fromISO(e.dueDate, { zone: "utc" }).toFormat(
      "dd LLL yyyy"
    );
    let createdDate = DateTime.fromISO(e.createdDate).toFormat("dd LLL yyyy");
    let paymentDate = e.paidDate
      ? DateTime.fromISO(e.paidDate).toFormat("dd LLL yyyy HH:mm")
      : "-";
    return (
      (e.merchantId = id),
      (e.formDate = startDate),
      (e.toDate = endDate),
      (e.pendingDate = dueDate),
      (e.invoiceCreatedDate = createdDate),
      (e.paymentDate = paymentDate)
    );
  });
  if (invoiceDetails) {
    invoiceDetails.sort((a, b) => {
      return new Date(b.modifiedDate) - new Date(a.modifiedDate);
    });
  }

  return (
    <React.Fragment>
      <DataGrid
        className={"dx-card wide-card"}
        dataSource={invoiceDetails}
        showBorders={false}
        visible={true}
        focusedRowEnabled={true}
        keyExpr="invoiceNumber"
      >
        <Paging defaultPageSize={10} />
        <MasterDetail enabled={true} component={updateInvoice} />
        <Paging defaultPageSize={10} />
        <Column dataField="invoiceNumber" caption={"Id"} width={70} />
        <Column
          dataField="invoiceCreatedDate"
          caption={"Invoice Created Date"}
        />
        <Column dataField="formDate" caption={"Start Date"} />
        <Column dataField="toDate" caption={"End Date"} />
        <Column dataField="pendingDate" caption={"Due Date"} />
        <Column dataField="paymentDate" caption={"Payment Date"} />
        <Column
          dataField="invoiceUrl"
          caption={"Download (↓)"}
          cellRender={invoiceUrl}
        />
        <Column
          dataField="invoiceAmount.$numberDecimal"
          caption={"Invoice.Amount (£)"}
          cellRender={invoiceAmount}
        />
        <Column dataField="status" caption={"Invoice.Status"} />
      </DataGrid>
    </React.Fragment>
  );
}

InvoiceList.propTypes = {
  data: PropTypes.object
};

export default InvoiceList;
