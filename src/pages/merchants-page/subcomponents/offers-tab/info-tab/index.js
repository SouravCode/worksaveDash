import React, { useCallback, useRef, useState, useEffect } from "react";
import "devextreme-react/text-area";
import LoadIndicator from "devextreme-react/load-indicator";
import Form, {
  Item,
  ButtonItem,
  ButtonOptions,
  Label,
  GroupItem,
  RequiredRule
} from "devextreme-react/form";
import { RadioGroup } from 'devextreme-react/radio-group';
import { cloneDeep } from "lodash";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Merchant } from "../../../../../business-layer/reducers";
import { getAccessToken } from "../../../../../services/src/auth-service/firebase";

const offerType = ["PERCENTAGE"];
const offerCategory = ["ALWAYS_OFFER","CURRENT_OFFER","FIRST_TIME_OFFER"];
const status = ['ACTIVE', 'INACTIVE'];
function InfoTab({ data, allData, updateOffer, isCreatingLocationOffer }) {
  const updateDetails = cloneDeep(data.data);
  // console.log(updateDetails);
  const formData = useRef({});
  // console.log("Update offer data",data.data);
  // console.log("All offer data",allData);

  const onUpdateLocationOffer = useCallback(async () => {
    let checkCounter = false, 
        previousOfferId = "";

    const {
      offerType,
      status,
      offerCategory,
      offerValue,
      woveValue,
      offerLimitValue,
      startDate,
      endDate
    } = updateDetails;
    if (
      !offerType ||
      !status ||
      !offerCategory ||
      !offerValue ||
      !woveValue ||
      !offerLimitValue ||
      !startDate ||
      !endDate
    ) {
      return;
    }
    const token = await getAccessToken();
    for(let i=0 ; i<allData.length; i++) {
      if(allData[i].status === status && allData[i].offerCategory === offerCategory) { 
        checkCounter = true;
        previousOfferId = allData[i].id;
        break;
      } 
    }
    if(checkCounter) {

      await updateOffer(
        {
          prevOfferId : previousOfferId,
          offerType,
          status,
          offerCategory,
          offerValue,
          woveValue,
          offerLimitValue,
          startDate,
          endDate,
          merchantId: data.data.merchantId,
          locationId: data.data.locationId,
          offerId: data.data.id,
          isPrimary: false
        },
        token
      ) ;
    } else {
      await updateOffer(
        {
          prevOfferId : "",
          offerType,
          status,
          offerCategory,
          offerValue,
          woveValue,
          offerLimitValue,
          startDate,
          endDate,
          merchantId: data.data.merchantId,
          locationId: data.data.locationId,
          offerId: data.data.id,
          isPrimary: false
        },
        token
      ) ;
    }
    // await updateOffer(
    //   {
    //     prevOfferId : "",
    //     offerType,
    //     status,
    //     offerCategory,
    //     offerValue,
    //     woveValue,
    //     offerLimitValue,
    //     startDate,
    //     endDate,
    //     merchantId: data.data.merchantId,
    //     locationId: data.data.locationId,
    //     offerId: data.data.id,
    //     isPrimary: true
    //   },
    //   token
    // );
    // console.log('updateoffer', updateOffer)
  }, [updateOffer]);

  const isUpdateLocationOffer =
    data.data.isPrimary == true && data.data.status == "ACTIVE";

  return (
    <Form
      formData={updateDetails}
      colCount={2}
      disabled={isCreatingLocationOffer}
    >
      <Item
        dataField={"offerType"}
        editorType={"dxSelectBox"}
        editorOptions={{ typeEditorOptions, items: offerType}}
      >
        <Label text={"OfferType"} />
        <RequiredRule message="offerType is required" />
      </Item>
      <Item
        dataField={"offerCategory"}
        editorType={"dxSelectBox"}
        editorOptions={{ typeEditorOptions, items: offerCategory}}
      >
        <Label text={"OfferCategory"} />
        <RequiredRule message="OfferCategory is required" />
      </Item>
      <Item
        dataField={"status"}
        editorType={"dxSelectBox"}
        editorOptions={{ typeEditorOptions, items: status }}
      >
        <Label text={"status"} />
        <RequiredRule message="offerStatus is required" />
      </Item>
      <Item dataField={"offerValue"} editorType={"dxTextBox"}>
        <RequiredRule message="offerValue is required" />
      </Item>
      <Item dataField={"woveValue"} editorType={"dxTextBox"}>
        <RequiredRule message="woveValue is required" />
      </Item>
      <Item dataField={"offerLimitValue"} editorType={"dxTextBox"}>
        <RequiredRule message="offerLimitValue is required" />
      </Item>
      <Item dataField={"startDate"} editorType={"dxDateBox"}>
        <Label text="Start Date/Time" />
        <RequiredRule message="startDate is required" />
      </Item>
      <Item dataField={"endDate"} editorType={"dxDateBox"}>
        <Label text="End Date/Time" />
        <RequiredRule message="endDate is required" />
      </Item>
      {isUpdateLocationOffer ? (
        <GroupItem colCount={1}>
          <ButtonItem>
            <ButtonOptions
              useSubmitBehavior={true}
              onClick={onUpdateLocationOffer}
              type={"default"}
              width={"100%"}
            >
              <span className="dx-button-text">
                {isCreatingLocationOffer ? (
                  <LoadIndicator
                    width={"24px"}
                    height={"24px"}
                    visible={true}
                  />
                ) : (
                  "Update Offer"
                )}
              </span>
            </ButtonOptions>
          </ButtonItem>
        </GroupItem>
      ) : (
        ""
      )}
    </Form>
  );
}
InfoTab.propTypes = {
  data: PropTypes.object,
  allData: PropTypes.array,
  updateOffer: PropTypes.func.isRequired,
  isCreatingLocationOffer: PropTypes.bool
};

const mapDispatchToProps = {
  updateOffer: Merchant.actions.updateOffer
};
const mapStateToProps = state => ({
  isCreatingLocationOffer: Merchant.selectors.isCreatingLocationOffer(state)
});
const connected = connect(
  mapStateToProps,
  mapDispatchToProps
);
const typeEditorOptions = { placeholder: "Eligible" };
const DateEditorOptions = {
  type: "time",
  pickerType: "calendar",
  showClearButton: true
};
export default connected(InfoTab);
