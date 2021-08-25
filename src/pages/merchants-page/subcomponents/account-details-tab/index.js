import React, { useRef, useCallback } from "react";
import "devextreme-react/text-area";
import { connect } from "react-redux";
import Form, { Item, Label } from "devextreme-react/form";
import { Merchant } from "../../../../business-layer/reducers";
import PropTypes from "prop-types";
import { cloneDeep } from "lodash";

function AccountsTab({ data, createAccount, updateAccount }) {
  let totalAccount = [];
  if (data.data && data.data.accounts.length > 0) {
    totalAccount = data.data.accounts.slice(-1);
  }
  let merchantAccount =
    data.data && totalAccount[0]
      ? cloneDeep(totalAccount[0])
      : {
        accountName: "",
        accountType: "",
        accountNumber: "",
        routingNumber: ""
      };

  return (
    <Form formData={merchantAccount} colCount={2}>
      <Item
        dataField={"accountNumber"}
        editorType={"dxTextBox"}
        editorOptions={typeEditOptions}
      />

      <Item
        dataField={"accountName"}
        editorType={"dxTextBox"}
        editorOptions={typeEditOptions}
      />
      <Item />
    </Form>
  );
}
AccountsTab.propTypes = {
  data: PropTypes.object,
  createAccount: PropTypes.func.isRequired,
  updateAccount: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  createAccount: Merchant.actions.createAccount,
  updateAccount: Merchant.actions.updateAccount
};

const connected = connect(
  null,
  mapDispatchToProps
);
const typeEditorOptions = { placeholder: "Eligible" };

const typeEditOptions = { readOnly: true };

export default connected(AccountsTab);
