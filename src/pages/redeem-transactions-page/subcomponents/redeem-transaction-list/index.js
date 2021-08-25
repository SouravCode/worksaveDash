import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { Merchant } from "../../../../business-layer/reducers";
import { RedeemTransactions as RedeemsDomain } from "../../../../business-layer/domains";
import PropTypes from "prop-types";
import Form, {
  Item,
  Label,
  ButtonItem,
  ButtonOptions,
  GroupItem
} from "devextreme-react/form";
import "devextreme/data/odata/store";
import { DateTime } from "luxon";
import { cloneDeep } from "lodash";
import DataGrid, {
  Column,
  Pager,
  Paging,
  MasterDetail
} from "devextreme-react/data-grid";
import RedeemDetails from "./redeem-transaction-details";
import { getStatus } from "../../../../services/src/api/models/client";
import { getAccessToken } from "../../../../services/src/auth-service/firebase";

function RedeemList({ getRedeemTransactions, redeemTransactions }) {
  const [statusDetails, setStatusDetails] = useState([]);
  const [formData, setformData] = useState(useRef({}));
  let redeemDetails = [];
  let fromDate = "";
  let endDate = "";
  useEffect(() => {
    Status();
    getAccessToken().then(token => {
      getRedeemTransactions(token);
    })
  }, [getRedeemTransactions]);
  const Status = async () => {
    let type = "redeemStatus";
    const token = await getAccessToken();
    const apiResponce = await getStatus(type, token);
    setStatusDetails(apiResponce.results.data.redeemStatus);
  };

  if (redeemTransactions && redeemTransactions.length > 0) {
    redeemDetails = cloneDeep(redeemTransactions);

    redeemDetails.map((e, index) => {
      fromDate =
        redeemDetails[index] && redeemDetails[index].createdDate
          ? DateTime.fromISO(redeemDetails[index].createdDate).toFormat(
            "dd LLL yy HH:mm"
          )
          : "-";
      endDate =
        redeemDetails[index] && redeemDetails[index].paidDate
          ? DateTime.fromISO(redeemDetails[index].paidDate).toFormat(
            "dd LLL yy HH:mm"
          )
          : "-";
      return (e.fromDate = fromDate), (e.payedDate = endDate);
    });
  }

  const onSuccess = () => {
    const { status, endDate, startDate, redeemId } = formData.current;
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
    query = start ? `${query}&startDate=${start}` : query;
    query = end ? `${query}&endDate=${end}` : query;
    query = redeemId ? `${query}&redeemId=${redeemId}` : query;
    getAccessToken().then(token => {
      getRedeemTransactions(token, query);
    });
  };

  let form = useRef({});
  const clearState = () => {
    setformData(form);
  };

  const onReset = () => {
    let query = "";
    if (formData && formData.current) {
      setformData(
        delete formData.current.status,
        delete formData.current.endDate,
        delete formData.current.startDate
      );
      console.log(formData);
    }
    clearState();
    getAccessToken().then(token => {
      getRedeemTransactions(token, query);
    });

  };
  return (
    <React.Fragment>
      <Form formData={formData.current}>
        <GroupItem colCount={6}>
          <Item
            dataField={"status"}
            editorType="dxSelectBox"
            editorOptions={{ typeEditorOptions, items: statusDetails }}
          >
            <Label text={"Redeem Status"} />
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
          <Item dataField={"redeemId"} editorType={"dxTextBox"} />
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
        <Item />
      </Form>
      <DataGrid
        showBorders={false}
        focusedRowEnabled={true}
        columnAutoWidth={true}
        dataSource={redeemDetails}
        keyExpr="id"
      >
        <Paging defaultPageSize={20} />
        <MasterDetail enabled={true} component={RedeemDetails} />
        <Column dataField={"redeemId"} caption={"ID"} width={70} />
        <Column dataField={"name"} caption={"C.Name"} />
        <Column dataField={"amount"} caption={"Amount"} width={90} />
        <Column dataField={"fromDate"} caption={"Requested Date"} />
        <Column dataField={"accountName"} caption={"Account Name"} />
        <Column dataField={"payedDate"} caption={"Payed Date"} />
        <Column dataField={"status"} caption={"Status"} />
      </DataGrid>
    </React.Fragment>
  );
}
RedeemList.propTypes = {
  getRedeemTransactions: PropTypes.func.isRequired,
  redeemTransactions: RedeemsDomain.PropShape,
  data: PropTypes.object,
  isLoading: PropTypes.bool
};

const mapDispatchToProps = {
  getRedeemTransactions: Merchant.actions.getRedeemTransactions
};

const mapStateToProps = state => ({
  redeemTransactions: Merchant.selectors.getRedeemTransactions(state),
  isLoading: Merchant.selectors.isLoading(state)
});

const connected = connect(
  mapStateToProps,
  mapDispatchToProps
);

const typeEditorOptions = { placeholder: "Category" };

export default connected(RedeemList);
