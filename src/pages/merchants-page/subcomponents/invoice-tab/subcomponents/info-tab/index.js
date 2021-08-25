import React, { useCallback, useRef, useState, useEffect } from "react";
import "devextreme-react/text-area";
import { getAccessToken } from "../../../../../../services/src/auth-service/firebase";
import Form, {
  Item,
  Label,
  ButtonItem,
  ButtonOptions,
  GroupItem,
  SimpleItem
} from "devextreme-react/form";
import LoadIndicator from "devextreme-react/load-indicator";
import { cloneDeep } from "lodash";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Merchant } from "../../../../../../business-layer/reducers";
import { getStatus } from "../../../../../../services/src/api/models/client";
function InfoTab({ data, updateInvoice, onCancel, paymentInitiate }) {
  const [statusArray, setStatusArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);
  const formData = useRef({});
  let id;
  const invoiceDetails = cloneDeep(data.data);
  if (data.data && data.data.id) {
    id = data.data.id;
  }
  if (data.data && data.data._id) {
    id = data.data._id;
  }
  const updateDetail = async () => {
    setStatusLoading(true);
    const { comment = "" } = formData.current;
    const { status } = invoiceDetails;
    const token = await getAccessToken();
    await updateInvoice(
      {
        status,
        comment,
        merchantId: invoiceDetails.merchantId,
        invoiceId: id
      },
      token
    );
    setStatusLoading(false);
  };
  const intiatePayment = async data => {
    setLoading(true);
    const remotePaymentAccountId = data.account[0].remotePaymentAccountId;
    const amount = parseFloat(data.invoiceAmount.$numberDecimal).toFixed(2);
    const { merchantId: merchantObjId, id: invoiceId } = data;

    console.log({ merchantObjId, remotePaymentAccountId, amount, invoiceId });

    const token = await getAccessToken();
    const details = await paymentInitiate(token, {
      merchantObjId,
      remotePaymentAccountId,
      amount,
      invoiceId
    });
    setLoading(false);
    if (details && details.results) {
      setDisableBtn(true);
    }
  };
  useEffect(() => {
    Status();
  }, []);
  const Status = async () => {
    let type = "invoiceStatus";
    const token = await getAccessToken();
    const apiResponce = await getStatus(type, token);
    setStatusArray(apiResponce.results.data.invoiceStatus);
  };
  const isInvoiceStatus =
    invoiceDetails.status !== "INVOICE_PAID" &&
    invoiceDetails.status !== "INVOICE_PAYED" &&
    invoiceDetails.status !== "INVOICE_RAISED_DECLINED" &&
    invoiceDetails.status !== "INVOICE_PAYMENT_SUCCEEDED" &&
    invoiceDetails.status !== "INVOICE_PAYMENT_IN_PROCESS";
  return (
    <React.Fragment>
      <Form
        formData={invoiceDetails}
        colCount={2}
        disabled={loading || statusLoading}
      >
        <Item />
        {isInvoiceStatus ? (
          <ButtonItem>
            <ButtonOptions
              disabled={disableBtn}
              type={"default"}
              width={"100%"}
              onClick={() => intiatePayment(invoiceDetails)}
            >
              <span className="dx-button-text">
                {loading ? (
                  <LoadIndicator
                    width={"24px"}
                    height={"24px"}
                    visible={true}
                  />
                ) : (
                  "Payment Initiate"
                )}
              </span>
            </ButtonOptions>
          </ButtonItem>
        ) : (
          <Item />
        )}
        <Item
          dataField={"status"}
          editorType={"dxSelectBox"}
          editorOptions={{ typeEditorOptions, items: statusArray }}
        />
        <Item />
      </Form>
      <Form
        formData={formData.current}
        colCount={1}
        disabled={loading || statusLoading}
      >
        <Item
          dataField={"comment"}
          editorType={"dxTextBox"}
          editorOptions={nameEditorOptions}
        />
        <Item />
      </Form>
      <Form>
        {invoiceDetails.status !== "INVOICE_PAYED" &&
          invoiceDetails.status !== "INVOICE_PAID" &&
          invoiceDetails.status !== "INVOICE_RAISED_DECLINED" ? (
          <ButtonItem colSpan={3}>
            <ButtonOptions
              type={"default"}
              width={"100%"}
              onClick={updateDetail}
            >
              <span className="dx-button-text">
                {statusLoading ? (
                  <LoadIndicator
                    width={"24px"}
                    height={"24px"}
                    visible={true}
                  />
                ) : (
                  "UPDATE STATUS"
                )}
              </span>
            </ButtonOptions>
          </ButtonItem>
        ) : (
          ""
        )}
      </Form>
    </React.Fragment>
  );
}
InfoTab.propTypes = {
  data: PropTypes.object,
  updateInvoice: PropTypes.func.isRequired,
  paymentInitiate: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  updateInvoice: Merchant.actions.updateInvoice,
  paymentInitiate: Merchant.actions.paymentInitiate
};

const connected = connect(
  null,
  mapDispatchToProps
);

const typeEditorOptions = { placeholder: "Eligible" };
const nameEditorOptions = {
  stylingMode: "filled",
  placeholder: "Text here...",
  mode: "commentbox"
};

export default connected(InfoTab);
