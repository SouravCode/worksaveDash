import React, { useRef, useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";
import { cloneDeep } from "lodash";
import PropTypes from "prop-types";
import "devextreme-react/text-area";
import { Merchant } from "../../../../business-layer/reducers";
import { getStatus } from "../../../../services/src/api/models/client";
import Form, {
  Item,
  Label,
  ButtonItem,
  ButtonOptions
} from "devextreme-react/form";
import LoadIndicator from "devextreme-react/load-indicator";
import { getAccessToken } from "../../../../services/src/auth-service/firebase";
function InfoTab({ data, updateRedeemTransactions }) {
  const [statusDetails, setStatusDetails] = useState([]);
  const [statusLoading, setStatusLoading] = useState(false);
  const customer = cloneDeep(data);
  const id = customer.id;
  useEffect(() => {
    Status();
  }, []);

  const Status = async () => {
    let type = "redeemStatus";
    const token = await getAccessToken();
    const apiResponce = await getStatus(type, token);
    setStatusDetails(apiResponce.results.data.redeemStatus);
  };
  const onUpdateRedeemTransactions = async () => {
    setStatusLoading(true);
    const { amount, status } = customer;
    if (amount < 0) {
      return;
    }
    const token = await getAccessToken();
    await updateRedeemTransactions(
      { status, amount, id },
      token
    );
    setStatusLoading(false);
  };
  return (
    <React.Fragment>
      <Form>
        <Item />
      </Form>
      <Form formData={customer} colCount={2} disabled={statusLoading}>
        <Item
          dataField={"status"}
          editorType="dxSelectBox"
          editorOptions={{ typeEditorOptions, items: statusDetails }}
        >
          <Label text={"Status"} />
        </Item>
        <Item dataField={"amount"} editorType={"dxNumberBox"}>
          <Label text={"Amount"} />
        </Item>
      </Form>
      <Form>
        {customer.status !== "PAYED" &&
          customer.status !== "PAY_REQUESTED_DECLINED" &&
          customer.status !== "PAID" ? (
          <ButtonItem colSpan={3}>
            <ButtonOptions
              type={"default"}
              width={"100%"}
              onClick={onUpdateRedeemTransactions}
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
const typeEditorOptions = { placeholder: "Category" };

InfoTab.propTypes = {
  data: PropTypes.object,
  updateRedeemTransactions: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  updateRedeemTransactions: Merchant.actions.updateRedeemTransactions
};

const connected = connect(
  null,
  mapDispatchToProps
);

export default connected(InfoTab);
