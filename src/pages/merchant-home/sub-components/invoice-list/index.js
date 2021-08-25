import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAccessToken } from "../../../../services/src/auth-service/firebase";
import DataGrid, { Column, Paging } from "devextreme-react/data-grid";
import { Link } from "react-router-dom";
import { PDFURI } from "../../../../app-config";
import "./invoice-list.scss";

import { Invoices as InvoiceReportDomain } from "../../../../business-layer/domains";
import { MerchantDashboard } from "../../../../business-layer/reducers";
function InvoiceList({ getMerchantInvoice, invoices }) {
  const history = useHistory();
  let startDates = "";
  let endDates = "";
  let dueDates = "";
  let Status = "";
  let transactionAmount = 0;
  useEffect(() => {
    const merchantDetails = localStorage.getItem("merchant")
      ? JSON.parse(localStorage.getItem("merchant"))
      : "";
    getAccessToken().then(token => {
      getMerchantInvoice(merchantDetails.id, token);
    });

  }, [getMerchantInvoice]);

  if (invoices && invoices.length > 0) {
    startDates = invoices[0].startDate;
    endDates = invoices[0].endDate;
    dueDates = invoices[0].dueDate;
    Status = invoices[0].status;
    transactionAmount = invoices[0].invoiceAmount
      ? parseFloat(invoices[0].invoiceAmount.$numberDecimal).toFixed(2)
      : 0;
  }
  const renderGridCell = data => {
    return (
      <tbody className={"customScroll"}>
        <tr className={"gridCell"}>
          <td>
            <p> {data.data.startDate}</p>
          </td>
          <td>
            <p>
              {data.data.invoiceAmount
                ? parseFloat(data.data.invoiceAmount.$numberDecimal).toFixed(2)
                : 0}
            </p>
          </td>
          <td>
            <p>{data.data.dueDate}</p>
          </td>

          <td className="ctr">
            {data.data && data.data.invoiceUrl ? (
              <a href={`${PDFURI}${data.data.invoiceUrl}`} target="_blank">
                Link
              </a>
            ) : (
              "-"
            )}
          </td>
          <td>
            <p>{data.data.endDate}</p>
          </td>
        </tr>
      </tbody>
    );
  };

  return (
    <div id="InvoiceSection">
      <div class="invoices">
        <div class="trans row space-between">
          <p class="transactionLable"> Latest Invoice</p>
          <p class="transactionVal invoice-date">{startDates}</p>
          <div class="row" />
        </div>
        <div class="divider" />
        <div class="row space-between">
          <div class="newCustomers ">
            <p class="lable">Amt</p>
            <p class="val due-amount">£ {transactionAmount}</p>
          </div>
          <div class="divider" />
          <div class="existingCustomers">
            <p class="lable">Due date</p>
            <p class="val due-date">{dueDates ? dueDates : "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

InvoiceList.propTypes = {
  getMerchantInvoice: PropTypes.func.isRequired,
  offers: InvoiceReportDomain.PropShape,
  isInvoiceLoading: PropTypes.bool
};

const mapDispatchToProps = {
  getMerchantInvoice: MerchantDashboard.actions.getInvoice
};

const mapStateToProps = state => ({
  invoices: MerchantDashboard.selectors.getInvoice(state),
  isInvoiceLoading: MerchantDashboard.selectors.isInvoiceLoading(state)
});

const connected = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connected(InvoiceList);
