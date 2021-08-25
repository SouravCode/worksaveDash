import React, { useEffect, useCallback, useState, useRef } from "react";
import { connect } from "react-redux";
import { getAccessToken } from "../../../../services/src/auth-service/firebase";
import { MerchantInvoice as InvoicesDomain } from "../../../../business-layer/domains";
import { Merchant } from "../../../../business-layer/reducers";
import PropTypes from "prop-types";
import { DateTime } from "luxon";
import { getStatus } from "../../../../services/src/api/models/client";
import LoadIndicator from "devextreme-react/load-indicator";
import { PDFURI } from "../../../../app-config";
import "./invoice-list.scss";
import "devextreme/data/odata/store";
import Form, {
  Item,
  Label,
  ButtonItem,
  ButtonOptions,
  GroupItem
} from "devextreme-react/form";
import DataGrid, { Column, Paging } from "devextreme-react/data-grid";

function MerchantInvoiceList({ getMerchantInvoice, invoices, isLoading }) {
  const [statusArray, setStatusArray] = useState([]);
  const [formData, setformData] = useState(useRef({}));
  let accountNum;
  let dueDates = "";
  let transactionAmount = 0;
  useEffect(() => {
    let query = "";
    Status();
    const merchantDetails = localStorage.getItem("merchant")
      ? JSON.parse(localStorage.getItem("merchant"))
      : "";
    getAccessToken().then(token => {
      getMerchantInvoice(merchantDetails.id, token, query);
    });

  }, [getMerchantInvoice]);

  const Status = async () => {
    let type = "invoiceStatus";
    const token = await getAccessToken();
    const apiResponce = await getStatus(type, token);
    setStatusArray(apiResponce.results.data.invoiceStatus);
  };

  const merchantDetails = localStorage.getItem("merchant")
    ? JSON.parse(localStorage.getItem("merchant"))
    : "";
  accountNum =
    merchantDetails.accounts &&
      merchantDetails.accounts.length > 0 &&
      merchantDetails.accounts[0].accountNumber
      ? merchantDetails.accounts[0].accountNumber
      : "-";
  if (invoices && invoices.length > 0) {
    let lastArray = invoices[0];
    dueDates = lastArray.dueDate;
    transactionAmount = lastArray.invoiceAmount
      ? parseFloat(lastArray.invoiceAmount.$numberDecimal).toFixed(2)
      : 0;
  }

  const onSuccess = () => {
    const { status, invoiceNumber, endDate, startDate } = formData.current;

    let start = startDate
      ? DateTime.fromISO(startDate.toISOString())
        .startOf("day")
        .toISO()
      : "";
    let end = endDate
      ? DateTime.fromISO(endDate.toISOString())
        .startOf("day")
        .toISO()
      : "";
    start = start.replace("+05:30", "Z");
    end = end.replace("00:00:00.000+05:30", "23:59:59.999Z");
    let query = "";
    query = status ? `${query}status=${status}` : query;
    query = invoiceNumber ? `${query}&invoiceNumber=${invoiceNumber}` : query;
    query = end ? `${query}&endDate=${end}` : query;
    query = start ? `${query}&startDate=${start}` : query;

    const merchantDetails = localStorage.getItem("merchant")
      ? JSON.parse(localStorage.getItem("merchant"))
      : "";
    getAccessToken().then(token => {
      getMerchantInvoice(merchantDetails.id, token, query);
    });

  };

  let form = useRef({});
  const clearState = () => {
    setformData(form);
  };

  const onReset = () => {
    if (formData && formData.current) {
      setformData(
        delete formData.current.status,
        delete formData.current.invoiceNumber,
        delete formData.current.endDate,
        delete formData.current.startDate,
        delete formData.current.merchantName,
        delete formData.current.invoiceAmount
      );
      console.log(formData);
    }
    clearState();
    const merchantDetails = localStorage.getItem("merchant")
      ? JSON.parse(localStorage.getItem("merchant"))
      : "";
    getAccessToken().then(token => {
      getMerchantInvoice(merchantDetails.id, token);
    });
  };

  const renderGridCell = data => {
    return (
      <tbody>
        <tr>
          <td className="ctr">{data.data.createdDate}</td>
          <p>
            <td className="right">{data.data.invoiceNumber}</td>
          </p>
          {/* <td className="left">{data.data.invoiceId}</td> */}
          <td className="center">
            {data.data.startDate} - {data.data.endDate}
          </td>
          <td>{data.data.dueDate}</td>
          <td className="left">
            {" "}
            {data.data.status == "INVOICE_PAID"
              ? DateTime.fromISO(data.data.paidDate).toFormat("dd LLL yyyy")
              : "-"}
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
          <td className="left">
            {data.data.invoiceAmount
              ? parseFloat(data.data.invoiceAmount.$numberDecimal).toFixed(2)
              : 0}
          </td>

          <td>
            <p className="chip">{data.data.status}</p>
          </td>
        </tr>
      </tbody>
    );
  };
  return (
    <React.Fragment>
      <Form formData={formData.current}>
        <GroupItem colCount={3}>
          <Item
            dataField={"status"}
            editorType="dxSelectBox"
            editorOptions={{ typeEditorOptions, items: statusArray }}
          >
            <Label text={"Invoice Status"} />
          </Item>
          <Item
            dataField={"startDate"}
            editorType={"dxDateBox"}
            editorOptions={{ placeholder: "MM/DD/YYYY" }}
          />

          <Item
            dataField={"endDate"}
            editorType={"dxDateBox"}
            colCount={1}
            editorOptions={{ placeholder: "MM/DD/YYYY" }}
          />
          <Item dataField={"invoiceNumber"} editorType={"dxTextBox"} />
          <ButtonItem>
            <ButtonOptions
              onClick={onSuccess}
              type={"filter"}
              width={"100%"}
              text={"submit"}
              className={"custom-button"}
            />
          </ButtonItem>
          <ButtonItem>
            <ButtonOptions
              onClick={onReset}
              type={"reset"}
              width={"100%"}
              text={"Reset"}
              className={"custom-button"}
            />
          </ButtonItem>
        </GroupItem>
      </Form>
      <div class={"row space-between invoice-container"}>
        <div className={"dueInvoice"}>
          <p className={"lable"}>Due invoice </p>
          <p className={"val"}>£ {transactionAmount}</p>
        </div>
        <div className={"dueDate"}>
          <p className={"lable"}>Due Date </p>
          <p className={"val"}>{dueDates ? dueDates : "N/A"}</p>
        </div>
        <div className={"nextInvoice"}>
          <p className={"lable"}>Next Invoice</p>
          <p className={"date"}>
            Invoice date : <span>N/A </span>
          </p>

          <p className={"period"}>
            Billing period : <span>N/A</span>
          </p>
        </div>
        <div className={"defaultMethod"}>
          <p className={"lable"}>Default payment method</p>
          <p className={"account"}>Bank account number with {accountNum}</p>
          <p className={"default"}>
            Auto payment within 4 days of the invoice date
          </p>
        </div>
      </div>
      <span className="dx-button-text">
        {isLoading ? (
          <LoadIndicator width={"24px"} height={"24px"} visible={true} />
        ) : (
          ""
        )}
      </span>
      <DataGrid
        dataSource={invoices}
        rowRender={renderGridCell}
        disabled={isLoading}
      >
        <Paging enabled={false} />
        <Column caption={"Invoice Created Date"} />
        <Column caption={"Invoice Number"} />

        <Column caption={"Billing Period"} />
        <Column caption={"Due Date"} />
        <Column caption={"Payment Date"} />
        <Column caption={"Download"} />
        <Column caption={"Amount (£)"} />
        <Column caption={"Invoice.Status"} />
      </DataGrid>
    </React.Fragment>
  );
}

MerchantInvoiceList.propTypes = {
  getMerchantInvoice: PropTypes.func.isRequired,
  invoices: InvoicesDomain.PropShape,
  isLoading: PropTypes.bool
};

const mapDispatchToProps = {
  getMerchantInvoice: Merchant.actions.getMerchantInvoice
};

const mapStateToProps = state => ({
  invoices: Merchant.selectors.getMerchantInvoice(state),
  isLoading: Merchant.selectors.isLoading(state)
});

const connected = connect(
  mapStateToProps,
  mapDispatchToProps
);

const typeEditorOptions = { placeholder: "Category" };

export default connected(MerchantInvoiceList);
