import React, { useEffect, useRef, useState, useCallback } from "react";
import { connect } from "react-redux";

import { Merchants as MerchantsDomain } from "../../../../business-layer/domains";
import { Merchant } from "../../../../business-layer/reducers";
import PropTypes from "prop-types";
import { getStatus } from "../../../../services/src/api/models/client";
import "devextreme/data/odata/store";

import DataGrid, {
  Column,
  Pager,
  Paging,
  FilterRow,
  MasterDetail
} from "devextreme-react/data-grid";
import Form, {
  Item,
  Label,
  ButtonItem,
  ButtonOptions,
  GroupItem
} from "devextreme-react/form";
import MerchantDetail from "./merchant-detail";
import { DateTime } from "luxon";
import { cloneDeep } from "lodash";
import { getSystemParameters } from "../../../../services/src/api/models/client";
import { getAccessToken } from "../../../../services/src/auth-service/firebase";
//const categoryType = ["Restaurant", "Pub", "Saloon"];
function MerchantList({ getMerchants, merchants, onSelectMerchant }) {
  const [statusArray, setStatusArray] = useState([]);
  const [formData, setformData] = useState(useRef({}));
  const [categoryType, setCategoryType] = useState([]);
  let merchantDetails = [];
  let fromDate = "";
  let endDate = "";
  useEffect(() => {
    Status();
    categoryStatus();
    getAccessToken().then(token => {
      getMerchants(token);
    })
  }, [getMerchants]);

  const Status = async () => {
    let type = "merchantStatus";
    const token = await getAccessToken();
    const apiResponce = await getStatus(type, token);
    setStatusArray(apiResponce.results.data.merchantStatus);
  };

  const categoryStatus = async () => {
    let type = "redeemStatus";
    const token = await getAccessToken();

    const apiResponce = await getSystemParameters(type, token);
    if (apiResponce) {
      apiResponce.data.merchantCategories.map(e => {
        categoryType.push(e.name);
      });
    }
    setCategoryType(categoryType);
  };
  if (merchants && merchants.length > 0) {
    merchantDetails = cloneDeep(merchants);
    merchantDetails.map((e, index) => {
      fromDate = DateTime.fromISO(merchantDetails[index].createdDate).toFormat(
        "dd LLL yyyy HH:mm"
      );
      endDate = DateTime.fromISO(merchantDetails[index].modifiedDate).toFormat(
        "dd LLL yyyy HH:mm"
      );
      return (e.fromDate = fromDate), (e.endDate = endDate);
    });
  }

  const onSuccess = () => {
    const {
      status,
      merchantName,
      category,
      zipcode,
      latitude,
      longitude,
      line1,
      line2,
      merchantId
    } = formData.current;
    let query = "";
    query = status ? `${query}status=${status}` : query;
    query = merchantId ? `${query}&merchantId=${merchantId}` : query;
    query = category ? `${query}&category=${category}` : query;
    query = zipcode ? `${query}&zipCode=${zipcode}` : query;
    query = merchantName ? `${query}&merchantName=${merchantName}` : query;
    query = latitude ? `${query}&latitude=${latitude}` : query;
    query = longitude ? `${query}&longitude=${longitude}` : query;
    query = line1 ? `${query}&line1=${line1}` : query;
    query = line2 ? `${query}&line2=${line2}` : query;
    getAccessToken().then(token => {
      getMerchants(token, query);

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
        delete formData.current.merchantId,
        delete formData.current.category,
        delete formData.current.zipcode,
        delete formData.current.merchantName,
        delete formData.current.latitude,
        delete formData.current.longitude,
        delete formData.current.line1,
        delete formData.current.line2
      );
      console.log(formData);
    }
    clearState();
    getAccessToken().then(token => {
      getMerchants(token);

    });

  };
  return (
    <React.Fragment>
      <Form formData={formData.current}>
        <GroupItem colCount={6}>
          <Item
            dataField={"status"}
            editorType="dxSelectBox"
            editorOptions={{ typeEditorOptions, items: statusArray }}
          >
            <Label text={"Merchant Status"} />
          </Item>
          <Item dataField={"merchantName"} editorType={"dxTextBox"} />
          <Item
            dataField={"category"}
            editorType="dxSelectBox"
            editorOptions={{ typeEditorOptions, items: categoryType }}
          >
            <Label text={"Category"} />
          </Item>
          <Item dataField={"merchantId"} editorType={"dxTextBox"} />
          <Item dataField={"zipcode"} editorType={"dxTextBox"} />
          <Item dataField={"latitude"} editorType={"dxTextBox"} />
          <Item dataField={"longitude"} editorType={"dxTextBox"} />
          <Item dataField={"line1"} editorType={"dxTextBox"} />
          <Item dataField={"line2"} editorType={"dxTextBox"} />
          <ButtonItem>
            <ButtonOptions
              onClick={onSuccess}
              type="filter"
              width={"100%"}
              text={"submit"}
              className={"custom-button"}
            />
          </ButtonItem>
          <ButtonItem>
            <ButtonOptions
              onClick={onReset}
              type="reset"
              width={"100%"}
              text={"Reset"}
              className={"custom-button"}
            />
          </ButtonItem>
        </GroupItem>
      </Form>
      <DataGrid
        className={"dx-card wide-card"}
        showBorders={false}
        focusedRowEnabled={true}
        dataSource={merchantDetails}
        keyExpr="id"
      >
        <MasterDetail enabled={true} component={MerchantDetail} />
        <Pager showInfo={true} />
        <FilterRow visible={true} />

        <Column dataField={"merchantId"} caption={"ID"} width={70} />

        <Column dataField={"category"} caption={"Type"} />

        <Column dataField={"name"} caption={"Name"} />

        <Column dataField={"description"} caption={"Description"} />

        <Column dataField={"fromDate"} caption={"CreatedDate"} />

        <Column dataField={"endDate"} caption={"ModifiedDate"} />
      </DataGrid>
    </React.Fragment>
  );
}

MerchantList.propTypes = {
  getMerchants: PropTypes.func.isRequired,
  merchants: MerchantsDomain.PropShape,
  onSelectMerchant: PropTypes.func.isRequired,
  isLoading: PropTypes.bool
};

const mapDispatchToProps = {
  getMerchants: Merchant.actions.getMerchants
};

const mapStateToProps = state => ({
  merchants: Merchant.selectors.getMerchants(state),
  isLoading: Merchant.selectors.isLoading(state)
});

const connected = connect(
  mapStateToProps,
  mapDispatchToProps
);

const typeEditorOptions = { placeholder: "Category" };

export default connected(MerchantList);
