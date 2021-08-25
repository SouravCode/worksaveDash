import React, { useEffect, useCallback, useState, useRef } from "react";
import { connect } from "react-redux";
import { MerchantInvoice as InvoicesDomain } from "../../../business-layer/domains";
import { Merchant } from "../../../business-layer/reducers";
import { getAccessToken } from "../../../services/src/auth-service/firebase";
import PropTypes from "prop-types";
import { DateTime } from "luxon";
import { getStatus } from "../../../services/src/api/models/client";
import { PDFURI } from "../../../app-config";
import "devextreme/data/odata/store";
import { Popup } from "devextreme-react/popup";
import DataGrid, { Column, Paging } from "devextreme-react/data-grid";
import InfoTab from "../info-tab";
import Form, {
  Item,
  Label,
  ButtonItem,
  ButtonOptions,
  GroupItem
} from "devextreme-react/form";
function InvoiceList({ getAllInvoices, invoiceList }) {
  const [statusArray, setStatusArray] = useState([]);
  const [formData, setformData] = useState(useRef({}));
  const [transData, setTrans] = useState([]);
  const [change, setChange] = useState(false);
  let totalInvoice = [];
  useEffect(() => {
    Status();
    getAccessToken().then(token => {
      getAllInvoices(token);
    });

  }, [getAllInvoices]);

  if (invoiceList) {
    invoiceList.map((invoice, index) => {
      if (invoice.invoices) {
        invoice.invoices.map(e => {
          let obj = {
            name: invoice.name,
            merchantId: invoice._id,
            createdDate: e.createdDate,
            Id: e._id,
            currentStatus: e.currentStatus,
            dueDate: e.dueDate,
            endDate: e.endDate,
            invoiceId: e.invoiceId,
            invoiceNumber: e.invoiceNumber,
            invoiceAmount: e.invoiceAmount,
            invoiceUrl: e.invoiceUrl,
            modifiedDate: e.modifiedDate,
            referenceId: e.referenceId,
            startDate: e.startDate,
            status: e.status,
            paidDate: e.paidDate
          };
          totalInvoice.push(obj);
        });
      }
    });
  }

  const onSuccess = () => {
    const {
      status,
      invoiceNumber,
      endDate,
      startDate,
      merchantName,
      invoiceAmount
    } = formData.current;
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
    query = merchantName ? `${query}&merchantName=${merchantName}` : query;
    query = invoiceAmount ? `${query}&invoiceAmount=${invoiceAmount}` : query;
    getAccessToken().then(token => {
      getAllInvoices(token, query);
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
    getAccessToken().then(token => {
      getAllInvoices(token);
    });

  };

  const onRaise = data => {
    setChange(true);
    transData.push(data);
    setTrans(transData);
  };
  const onCancel = () => {
    setChange();
    setTrans([]);
    getAccessToken().then(token => {
      getAllInvoices(token);
    });

  };
  const Status = async () => {
    let type = "invoiceStatus";
    const token = await getAccessToken();
    const apiResponce = await getStatus(type, token);
    setStatusArray(apiResponce.results.data.invoiceStatus);
  };

  const renderGridCell = data => {
    return (
      <tbody>
        <tr>
          <td className="left">{data.data.name}</td>

          <td className="right">{data.data.invoiceNumber}</td>

          <td className="left">
            {DateTime.fromISO(data.data.createdDate).toFormat("dd LLL yyyy")}
          </td>
          <td className="cent">
            {DateTime.fromISO(data.data.startDate).toFormat("dd LLL yy")} -
            {DateTime.fromISO(data.data.endDate, { zone: "utc" }).toFormat(
              "dd LLL yy"
            )}
          </td>

          <td className="left">
            {" "}
            {data.data.status == "INVOICE_PAID"
              ? DateTime.fromISO(data.data.paidDate).toFormat("dd LLL yyyy")
              : "-"}
          </td>
          <td className="left">
            {DateTime.fromISO(data.data.dueDate, { zone: "utc" }).toFormat(
              "dd LLL yyyy"
            )}
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

          <td className="invoiceStatus">
            <p title={data.data.status}>{data.data.status}</p>
          </td>
          <td>
            {data.data.status !== "INVOICE_PAYED" &&
              data.data.status !== "INVOICE_RAISED_DECLINED" &&
              data.data.status !== "INVOICE_PAID" ? (
              <button
                className={"closedChip"}
                onClick={() => onRaise(data.data)}
              >
                <p>Click Here</p>
              </button>
            ) : (
              ""
            )}
          </td>
        </tr>
      </tbody>
    );
  };
  totalInvoice.sort((a, b) => {
    return new Date(b.modifiedDate) - new Date(a.modifiedDate);
  });
  return (
    <React.Fragment>
      <Form formData={formData.current}>
        <GroupItem colCount={4}>
          <Item
            dataField={"status"}
            editorType="dxSelectBox"
            editorOptions={{ typeEditorOptions, items: statusArray }}
          >
            <Label text={"Invoice Status"} />
          </Item>
          <Item dataField={"merchantName"} editorType={"dxTextBox"} />
          <Item dataField={"invoiceAmount"} editorType={"dxTextBox"} />
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
              width={"100%"}
              type={"reset"}
              text={"Reset"}
              className={"custom-button"}
            />
          </ButtonItem>
        </GroupItem>
      </Form>
      <Popup
        visible={change}
        dataSource={transData}
        title="UPDATE INVOICE STATUS"
        width={350}
        height={500}
      >
        <InfoTab data={transData} onCancel={onCancel} />
      </Popup>
      <DataGrid dataSource={totalInvoice} rowRender={renderGridCell}>
        <Column caption={"Merchant Name"} />
        <Column caption={"Invoice Number"} />
        <Column caption={"Invoice Created Date"} />
        <Column caption={"Billing Period"} />
        <Column caption={"Payment Date"} />
        <Column caption={"Due Date"} />
        <Column caption={"Download (↓)"} />
        <Column caption={"Invoice.Amount (£)"} />
        <Column caption={"Invoice.Status"} />
        <Column caption={"Update"} />
      </DataGrid>
    </React.Fragment>
  );
}

InvoiceList.propTypes = {
  getInvoice: PropTypes.func.isRequired,
  invoiceList: InvoicesDomain.PropShape,
  isLoading: PropTypes.bool
};

const mapDispatchToProps = {
  getAllInvoices: Merchant.actions.getAllInvoices
};

const mapStateToProps = state => ({
  invoiceList: Merchant.selectors.getAllInvoices(state),
  isLoading: Merchant.selectors.isLoading(state)
});

const connected = connect(
  mapStateToProps,
  mapDispatchToProps
);

const typeEditorOptions = { placeholder: "Category" };

export default connected(InvoiceList);
