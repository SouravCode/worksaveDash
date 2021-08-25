import React, { useCallback, useState, useRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { DateTime } from "luxon";
import Form, {
  Item,
  Label,
  ButtonItem,
  ButtonOptions,
  GroupItem
} from "devextreme-react/form";

import { Merchant } from "../../../../business-layer/reducers";
import { getAccessToken } from "../../../../services/src/auth-service/firebase";

function TransactionFilter({ getTransactions }) {
  const [formData, setformData] = useState(useRef({}));
  const onclick = () => {
    const {
      startDate,
      endDate,
      amount,
      cardId,
      merchantId,
      merchantName,
      customerId,
      goalId
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
    query = start ? `${query}startDate=${start}` : query;
    query = end ? `${query}&endDate=${end}` : query;
    query = amount ? `${query}&amount=${amount}` : query;
    query = merchantId ? `${query}&merchantId=${merchantId}` : query;
    query = merchantName ? `${query}&merchantName=${merchantName}` : query;
    query = customerId ? `${query}&customerId=${customerId}` : query;
    query = goalId ? `${query}&goalId=${goalId}` : query;
    query = cardId ? `${query}&cardId=${cardId}` : query;
    getAccessToken().then(token => {
      getTransactions(token, query);
    });
  };
  let form = useRef({});
  const clearState = () => {
    setformData(form);
  };
  const onReset = () => {
    if (formData && formData.current) {
      setformData(
        delete formData.current.startDate,
        delete formData.current.endDate,
        delete formData.current.amount,
        delete formData.current.merchantId,
        delete formData.current.merchantName,
        delete formData.current.customerId,
        delete formData.current.goalId,
        delete formData.current.cardId
      );
      console.log(formData);
    }
    clearState();
    getAccessToken().then(token => {
      getTransactions(token);
    });

  };

  return (
    <React.Fragment>
      <Form formData={formData.current}>
        <GroupItem colCount={6}>
          <Item dataField={"merchantName"} editorType={"dxTextBox"} />
          <Item
            dataField={"startDate"}
            editorType={"dxDateBox"}
            editorOptions={{ placeholder: "MM/DD/YYYY" }}
          />
          <Item
            dataField={"endDate"}
            editorType={"dxDateBox"}
            editorOptions={{ placeholder: "MM/DD/YYYY" }}
          />
          <Item dataField={"amount"} editorType={"dxTextBox"} />
          {/* <Item dataField={"merchantId"} editorType={"dxTextBox"} /> */}
          <Item dataField={"customerId"} editorType={"dxTextBox"} />
          <Item dataField={"goalId"} editorType={"dxTextBox"} />
          <Item dataField={"cardId"} editorType={"dxTextBox"} />
          <ButtonItem>
            <ButtonOptions
              onClick={onclick}
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
    </React.Fragment>
  );
}
TransactionFilter.propTypes = {
  getTransactions: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  getTransactions: Merchant.actions.getTransactions
};
const connected = connect(
  null,
  mapDispatchToProps
);

export default connected(TransactionFilter);
