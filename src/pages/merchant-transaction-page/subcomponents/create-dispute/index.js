import React, { useRef, useCallback, useState, useEffect } from "react";
import Form, {
  Item,
  ButtonItem,
  ButtonOptions,
  GroupItem,
  RequiredRule
} from "devextreme-react/form";
import { Merchant } from "../../../../business-layer/reducers";
import PropTypes from "prop-types";
import LoadIndicator from "devextreme-react/load-indicator";
import { connect } from "react-redux";
import { getAccessToken } from "../../../../services/src/auth-service/firebase";
import "../transaction-list/transaction-list.scss";
const disputeStatus = ["MERCHANT, CUSTOMER"];
const disputeType = [
  "Charge Backs",
  "Customer used vocher or existing offer",
  "Failed invoice payment by merchant",
  "Card transaction not moving from Auth to settled",
  "Other"
];

let referenceId = "";
let transactionId = "";
let cardLastNumbers = "";
let amount = "";
let cashback = "";
let status = "";
function InfoTab({
  data,
  createDispute,
  visible,
  onCancel,
  isCreatingDispute
}) {
  const [formData, setformData] = useState(useRef({}));

  useEffect(() => {
    if (!visible && !isCreatingDispute) {
      onCancel();
    }
  }, [isCreatingDispute]);

  if (data && data.length > 0) {
    referenceId = data[0].id;
    transactionId = data[0].transactionId;
    cardLastNumbers = data[0].cardLastNumbers;
    amount = data[0].amount;
    cashback = data[0].cashback;
    status = data[0].transactionStatus;
  }
  if (formData && formData.current) {
    formData.current.reason = "Charge Backs";
  }
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
  const onCreateDispute = async () => {
    const merchantDetails = localStorage.getItem("merchant")
      ? JSON.parse(localStorage.getItem("merchant"))
      : "";
    const { comment, disputeId, reason } = formData.current;
    if (!comment) {
      return;
    }
    const token = await getAccessToken();
    await createDispute(
      {
        comment,
        disputeId,
        status: "PENDING",
        createdBy: merchantDetails.name,
        referenceId,
        type: reason
      },
      token
    );
    onReset();
  };

  const nameEditorOptions = {
    stylingMode: "filled",
    placeholder: "Text here...",
    mode: "commentbox"
  };

  return (
    <React.Fragment>
      <div className={"disputeChat"}>
        <div className={"flex space-between transheader"}>
          <div>
            <p className={"label"}>Trans. ID</p>
            <p>{transactionId}</p>
          </div>
          <div>
            <p className={"label"}>Card Number</p>
            <p>{cardLastNumbers}</p>
          </div>
          <div>
            <p className={"label"}>Amount</p>
            <p>{amount}</p>
          </div>
          <div>
            <p className={"label"}>Cashback (£)</p>
            <p>{cashback}</p>
          </div>
          <div className={"flex my-auto"}>
            <p>Transaction Status</p>
            {status == "CLEARED" ? <p className={"cleared"}>{status}</p> : ""}
            {status == "PENDING" ? (
              <p className={"pendingStatus"}>{status}</p>
            ) : (
              ""
            )}
            {status !== "CLEARED" && status !== "PENDING" ? (
              <p className={"allStatus"}>{status}</p>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <br />
      <Form formData={formData.current} disabled={isCreatingDispute}>
        <Item
          dataField={"reason"}
          editorType={"dxSelectBox"}
          editorOptions={{ typeEditorOptions, items: disputeType }}
        />
        <Item />

        <Item
          dataField={"comment"}
          editorType={"dxTextArea"}
          editorOptions={nameEditorOptions}
        >
          <RequiredRule message="Comment is required" />
        </Item>
        <Item />
        <GroupItem colCount={2}>
          <ButtonItem>
            <ButtonOptions
              type={"default"}
              onClick={onCreateDispute}
              useSubmitBehavior={true}
              width="100%"
            >
              <span className="dx-button-text">
                {isCreatingDispute ? (
                  <LoadIndicator
                    width={"24px"}
                    height={"24px"}
                    visible={true}
                  />
                ) : (
                  "Create"
                )}
              </span>
            </ButtonOptions>
          </ButtonItem>
          <ButtonItem>
            <ButtonOptions text={"Close"} width={"100%"} onClick={onCancel} />
          </ButtonItem>
        </GroupItem>
      </Form>
    </React.Fragment>
  );
}

InfoTab.propTypes = {
  data: PropTypes.object,
  createDispute: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  visible: PropTypes.bool,
  isCreatingDispute: PropTypes.bool
};

const mapDispatchToProps = {
  createDispute: Merchant.actions.createDispute
};

const mapStateToProps = state => ({
  isCreatingDispute: Merchant.selectors.isCreatingDispute(state)
});

const connected = connect(
  mapStateToProps,
  mapDispatchToProps
);

const typeEditorOptions = { placeholder: "Eligible" };

export default connected(InfoTab);
