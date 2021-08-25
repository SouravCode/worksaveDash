import PropTypes from "prop-types";
import React, { useRef, useCallback, useState } from "react";
import { connect } from "react-redux";
import { DateTime } from "luxon";
import { getAccessToken } from "../../../../../../services/src/auth-service/firebase";
import { Merchant } from "../../../../../../business-layer/reducers";
import LoadIndicator from "devextreme-react/load-indicator";
import Form, {
  Item,
  Label,
  ButtonItem,
  ButtonOptions,
  RequiredRule,
  GroupItem
} from "devextreme-react/form";
import { getInvoiceTransactions } from "../../../../../../services/src/api/models/client";
import DataGrid, {
  Column,
  Pager,
  Paging,
  Selection
} from "devextreme-react/data-grid";
import notify from "devextreme/ui/notify";

let transactions = [];
function InvoiceForm({ createInvoice, isCreating, isHidden, onCancel, data }) {
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [transactionDetails, setDetails] = useState([]);
  const formData = useRef({});
  const merchantId = data.id;
  const notificationTextSuccess = "Add Transactions for Creating Invoice";
  const notificationText = "Add Bank Details for Invoice";
  const onSubmit = async e => {
    e.preventDefault();

    const { startDate, endDate, dueDate, invoiceNumber } = formData.current;
    if (
      data &&
      data.accounts.length > 0 &&
      data.accounts[0].status == "INACTIVE"
    ) {
      return notify(notificationText, "error", 2000);
    }
    if (amount == 0) {
      return notify(notificationTextSuccess, "error", 2000);
    }
    let start = DateTime.fromISO(startDate.toISOString())
      .startOf("day")
      .toISO();
    let end = DateTime.fromISO(endDate.toISOString())
      .startOf("day")
      .toISO();
    let pending = DateTime.fromISO(dueDate.toISOString()).toISO();
    start = start.replace("+05:30", "Z");
    end = end.replace("00:00:00.000+05:30", "23:59:59.999Z");
    pending = pending.replace("00:00:00.000+05:30", "23:59:59.999Z");
    const token = await getAccessToken();
    await createInvoice(
      {
        startDate: start,
        endDate: end,
        dueDate: pending,
        invoiceNumber,
        transactions,
        merchantId,
        invoiceAmount: amount
      },
      token
    );
    if (transactions.length > 0) {
      transactions = [];
      setDetails([]);
    }
  };

  const onSelectionChanged = data => {
    if (data.currentSelectedRowKeys && data.currentSelectedRowKeys.length > 0) {
      let total = amount;
      data.currentSelectedRowKeys.forEach(currentSelectedRowKey => {
        let transData = transactionDetails.find(e => {
          return e.id === currentSelectedRowKey;
        });
        total += parseFloat(transData.woveAmount);
        setAmount(total);
        let obj = {
          id: transData.id,
          amount: transData.amount,
          cashback: transData.cashback,
          woveAmount: transData.woveAmount,
          transactionDate: transData.transactionDate
        };
        transactions.push(obj);
      });
    } else if (
      data.currentDeselectedRowKeys &&
      data.currentDeselectedRowKeys.length > 0
    ) {
      let total = amount;
      data.currentDeselectedRowKeys.forEach(currentDeselectedRowKey => {
        let transData = transactionDetails.find(e => {
          return e.id === currentDeselectedRowKey;
        });
        total -= parseFloat(transData.woveAmount);
        setAmount(total);
        transactions = transactions.filter(e => {
          return e.id != currentDeselectedRowKey;
        });
      });
    }
  };
  formData.current.endDate = new Date();
  const onFilter = async () => {
    setLoading(true);
    const { startDate, endDate } = formData.current;
    let start = DateTime.fromISO(startDate.toISOString())
      .startOf("day")
      .toUTC();
    let end = DateTime.fromISO(endDate.toISOString())
      .startOf("day")
      .toISO();
    end = end.replace("00:00:00.000+05:30", "23:59:59.999Z");
    const query = `startDate=${start ? start : ""}&endDate=${end ? end : ""}`;
    const token = await getAccessToken();
    const apiResponce = await getInvoiceTransactions(
      merchantId,
      token,
      query
    );
    setLoading(false);
    setDetails(apiResponce ? apiResponce.data : null);
  };
  const cancle = () => {
    if (!isHidden) {
      onCancel();
      setDetails([]);
      setAmount(0);
    }
  };
  if (isHidden) {
    return null;
  }
  return (
    <React.Fragment>
      <form onSubmit={onSubmit}>
        <Form formData={formData.current} disabled={isCreating}>
          <GroupItem colCount={2}>
            <Item
              dataField={"startDate"}
              editorType={"dxDateBox"}
              editorOptions={startEditorOptions}
            >
              <RequiredRule message="State Date is required" />
              <Label visible={false} />
            </Item>
            <Item
              dataField={"endDate"}
              editorType={"dxDateBox"}
              editorOptions={endEditorOptions}
            >
              <RequiredRule message="End Date is required" />
              <Label visible={false} />
            </Item>
            <Item
              dataField={"dueDate"}
              editorType={"dxDateBox"}
              editorOptions={dueEditorOptions}
            >
              <RequiredRule message="Due Date is required" />
              <Label visible={false} />
            </Item>
            {/* <Item
              dataField={"invoiceNumber"}
              editorType={"dxTextBox"}
              editorOptions={invoiceEditorOptions}
            >
              <Label visible={false} />
            </Item> */}
            <ButtonItem>
              <ButtonOptions type={"default"} width={"100%"} onClick={onFilter}>
                <span className="dx-button-text">
                  {loading ? (
                    <LoadIndicator
                      width={"24px"}
                      height={"24px"}
                      visible={true}
                    />
                  ) : (
                    "Get Transactions"
                  )}
                </span>
              </ButtonOptions>
            </ButtonItem>
          </GroupItem>
          <GroupItem caption=" Transaction Details" colCount={2}>
            <DataGrid
              dataSource={transactionDetails}
              keyExpr="id"
              showBorders={true}
              showColumnLines={true}
              onSelectionChanged={onSelectionChanged}
            >
              <Selection mode={"multiple"} />
              <Paging defaultPageSize={10} />
              <Pager showInfo={true} />
              <Column disabled={true} dataField={"id"} caption={"ID"} />
              <Column dataField={"amount"} caption={"Amount (£)"} width={90} />
              <Column
                dataField={"cashback"}
                caption={"Cashback (£)"}
                width={90}
              />
              <Column
                dataField={"woveAmount"}
                caption={"Wove Amount (£)"}
                width={90}
              />
              <Column
                dataField={"transactionDate"}
                caption={"Transaction Date"}
                dataType={"datetime"}
              />
            </DataGrid>
            <Item />
            <div>
              <p className={"woveAmount"}>
                Total Wove-Amount: {parseFloat(amount).toFixed(2)}
              </p>
            </div>
          </GroupItem>

          <GroupItem colCount={2}>
            <ButtonItem>
              <ButtonOptions
                type={"default"}
                useSubmitBehavior={true}
                width={"100%"}
              >
                <span className="dx-button-text">
                  {isCreating ? (
                    <LoadIndicator
                      width={"24px"}
                      height={"24px"}
                      visible={true}
                    />
                  ) : (
                    "Create Invoice"
                  )}
                </span>
              </ButtonOptions>
            </ButtonItem>
            <ButtonItem>
              <ButtonOptions text={"cancel"} width={"100%"} onClick={cancle} />
            </ButtonItem>
          </GroupItem>
        </Form>
      </form>
    </React.Fragment>
  );
}

const startEditorOptions = {
  stylingMode: "filled",
  placeholder: "Start Date",
  mode: "text"
};
const dueEditorOptions = {
  stylingMode: "filled",
  placeholder: "Due Date",
  mode: "text"
};
const endEditorOptions = {
  stylingMode: "filled",
  placeholder: "End Date",
  mode: "text"
};
const invoiceEditorOptions = {
  stylingMode: "filled",
  placeholder: "Invoice Number",
  mode: "text"
};
const idEditorOptions = {
  stylingMode: "filled",
  placeholder: "Reference Id",
  mode: "text"
};

InvoiceForm.propTypes = {
  createInvoice: PropTypes.func.isRequired,
  isCreating: PropTypes.bool,
  isHidden: PropTypes.bool.isRequired,
  getMerchantTransactions: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  createInvoice: Merchant.actions.createInvoice,
  getMerchantTransactions: Merchant.actions.getMerchantTransactions
};

const mapStateToProps = state => ({
  isCreating: Merchant.selectors.isCreating(state),
  isLoading: Merchant.selectors.isLoading(state)
});

const connected = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connected(InvoiceForm);
