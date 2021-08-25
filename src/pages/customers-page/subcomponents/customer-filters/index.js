import React, { useCallback, useRef, useState } from "react";
import { getAccessToken } from "../../../../services/src/auth-service/firebase";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Customer } from "../../../../business-layer/reducers";
import Form, {
  Item,
  Label,
  ButtonItem,
  ButtonOptions,
  GroupItem
} from "devextreme-react/form";

function CustomerFilter({ getCustomers }) {
  const [formData, setformData] = useState(useRef({}));
  const onclick = () => {
    const {
      name,
      mobileNumber,
      emailId,
      cardId,
      customerId,
      cardLastNumbers,
      cardType,
      cardFirstNumbers
    } = formData.current;
    let query = "";
    query = name ? `${query}name=${name}` : query;
    query = mobileNumber ? `${query}&mobileNumber=${mobileNumber}` : query;
    query = emailId ? `${query}&emailId=${emailId}` : query;
    query = cardId ? `${query}&cardId=${cardId}` : query;
    query = customerId ? `${query}&customerId=${customerId}` : query;
    query = cardLastNumbers
      ? `${query}&cardLastNumbers=${cardLastNumbers}`
      : query;
    query = cardType ? `${query}&cardType=${cardType}` : query;
    query = cardFirstNumbers
      ? `${query}&cardFirstNumbers=${cardFirstNumbers}`
      : query;
    getAccessToken().then(token => {
      getCustomers(token, query);
    });

  };

  let form = useRef({});
  const clearState = () => {
    setformData(form);
  };
  const onReset = () => {
    if (formData && formData.current) {
      setformData(
        delete formData.current.name,
        delete formData.current.mobileNumber,
        delete formData.current.emailId,
        delete formData.current.cardId,
        delete formData.current.customerId,
        delete formData.current.cardLastNumbers,
        delete formData.current.cardType,
        delete formData.current.cardFirstNumbers
      );
      console.log(formData);
    }
    clearState();
    getAccessToken().then(token => {
      getCustomers(token);
    });

  };

  return (
    <React.Fragment>
      <Form formData={formData.current}>
        <GroupItem colCount={6}>
          <Item dataField={"name"} editorType={"dxTextBox"} />
          <Item dataField={"mobileNumber"} editorType={"dxTextBox"} />
          <Item dataField={"emailId"} editorType={"dxTextBox"} />
          <Item dataField={"cardId"} editorType={"dxTextBox"} />
          <Item dataField={"customerId"} editorType={"dxTextBox"} />
          <Item dataField={"cardLastNumbers"} editorType={"dxTextBox"} />
          <Item dataField={"cardType"} editorType={"dxTextBox"} />
          <Item dataField={"cardFirstNumbers"} editorType={"dxTextBox"} />
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
CustomerFilter.propTypes = {
  getCustomers: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  getCustomers: Customer.actions.getCustomers
};
const connected = connect(
  null,
  mapDispatchToProps
);

export default connected(CustomerFilter);
