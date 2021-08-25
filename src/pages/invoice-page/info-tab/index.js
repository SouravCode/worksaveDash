import React, { useCallback, useRef, useState, useEffect } from "react";
import "devextreme-react/text-area";
import LoadIndicator from "devextreme-react/load-indicator";
import Form, {
  Item,
  ButtonItem,
  ButtonOptions,
  RequiredRule
} from "devextreme-react/form";
import { getStatus } from "../../../services/src/api/models/client";
import PropTypes from "prop-types";
import { cloneDeep } from "lodash";
import { connect } from "react-redux";
import { Merchant } from "../../../business-layer/reducers";
import { getAccessToken } from "../../../services/src/auth-service/firebase";

function InfoTab({
  data,
  updateInvoice,
  onCancel,
  visible,
  isUpdatingInvoice
}) {
  const [statusArray, setStatusArray] = useState([]);
  const [formData, setformData] = useState(useRef({}));
  const invoiceDetails = cloneDeep(data[0]);
  useEffect(() => {
    if (!visible && !isUpdatingInvoice) {
      onCancel();
    }
  }, [isUpdatingInvoice]);

  let form = useRef({});
  const clearState = () => {
    setformData(form);
  };
  const onReset = () => {
    if (formData && formData.current) {
      setformData(delete formData.current.comment);
      console.log(formData);
    }
    clearState();
  };
  const updateDetails = async () => {
    const { status } = invoiceDetails;
    const { comment } = formData.current;
    if (!comment) {
      return;
    }
    const token = await getAccessToken();
    await updateInvoice(
      {
        status,
        comment,
        merchantId: data[0].merchantId,
        invoiceId: data[0].Id
      },
      token
    );
    onReset();
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
  const validationRules = {
    position: [{ type: "required", message: "Message is required." }]
  };

  const nameEditorOptions = {
    stylingMode: "filled",
    placeholder: "Text here...",
    mode: "commentbox"
  };

  const validateForm = e => {
    e.component.validate();
  };
  return (
    <React.Fragment>
      <Form formData={invoiceDetails} colCount={1} disabled={isUpdatingInvoice}>
        <Item
          dataField={"status"}
          editorType={"dxSelectBox"}
          editorOptions={{ typeEditorOptions, items: statusArray }}
        />

        <Item />
      </Form>
      <Form formData={formData.current} colCount={1} disabled={isUpdatingInvoice}>
        <Item
          dataField={"comment"}
          editorType={"dxTextArea"}
          editorOptions={nameEditorOptions}
        >
          <RequiredRule message="Comment is required" />
        </Item>

        <Item />

        <ButtonItem>
          <ButtonOptions
            useSubmitBehavior={true}
            type={"default"}
            onClick={updateDetails}
            width="100%"
          >
            <span className="dx-button-text">
              {isUpdatingInvoice ? (
                <LoadIndicator width={"24px"} height={"24px"} visible={true} />
              ) : (
                "Update"
              )}
            </span>
          </ButtonOptions>
        </ButtonItem>
        <ButtonItem>
          <ButtonOptions width={"100%"} text={"Close"} onClick={onCancel} />
        </ButtonItem>
      </Form>
    </React.Fragment>
  );
}
InfoTab.propTypes = {
  data: PropTypes.object,
  updateInvoice: PropTypes.func.isRequired,
  visible: PropTypes.bool,
  isUpdatingInvoice: PropTypes.bool
};

const mapDispatchToProps = {
  updateInvoice: Merchant.actions.updateInvoice
};

const mapStateToProps = state => ({
  isUpdatingInvoice: Merchant.selectors.isUpdatingInvoice(state)
});

const connected = connect(
  mapStateToProps,
  mapDispatchToProps
);

const typeEditorOptions = { placeholder: "Eligible" };

export default connected(InfoTab);
