import React, { useEffect, useState, useRef, useCallback } from "react";
import "devextreme-react/text-area";
import LoadIndicator from "devextreme-react/load-indicator";
import { connect } from "react-redux";
import { Merchant } from "../../../../../business-layer/reducers";
import Form, {
  Item,
  ButtonItem,
  ButtonOptions,
  Label,
  GroupItem,
  RequiredRule
} from "devextreme-react/form";
import PropTypes from "prop-types";
import { getAccessToken } from "../../../../../services/src/auth-service/firebase";
const offerType = ["PERCENTAGE"];
const offerCategory = ["ALWAYS_OFFER","CURRENT_OFFER","FIRST_TIME_OFFER"];
const status = ['ACTIVE', 'INACTIVE'];
function OffersTab({
  data,
  createOffer,
  updateOffer,
  isCreatingLocationOffer,
  isHidden,
  onCancel
}) {
  var val;
  const [isMatch, setIsMatch] = useState(false);
  const [prevId, setPrevId] = useState("");
  const formData = useRef({});
  let latestOffer =
    data.data && data.data.locations.length > 0
      ? data.data.locations[0].offers.slice(-1)[0]
      : "";
  formData.current.startDate = new Date();
  formData.current.endDate = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);
  const onCreateLocationOffer = useCallback(async () => {
    
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
    } = formData.current;

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
    if (data.data.locations[0].offers.length == 0) {

      await createOffer(
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
          merchantId: data.data.id,
          locationId: data.data.locations[0].id,
          isPrimary: true
        },
        token
      );
    } else if (data.data.locations[0].offers.length > 0) {
      for(let i=0 ; i<data.data.locations[0].offers.length; i++) {
        if(data.data.locations[0].offers[i].status === status && data.data.locations[0].offers[i].offerCategory === offerCategory) { 
          checkCounter = true;
          previousOfferId = data.data.locations[0].offers[i].id;
          break;
        } 
      }
      if(checkCounter) {
       
        await createOffer(
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
            merchantId: data.data.id,
            locationId: data.data.locations[0].id,
            isPrimary: false
          },
          token
        ) ;
      } else {
        await createOffer(
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
            merchantId: data.data.id,
            locationId: data.data.locations[0].id,
            isPrimary: false
          },
          token
        ) ;
      }
      
    }
  }, [createOffer]);

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
    } = formData.current;
    const token = await getAccessToken();
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
    // await updateOffer(
    //   {
    //     offerType,
    //     status,
    //     offerCategory,
    //     offerValue,
    //     woveValue,
    //     offerLimitValue,
    //     startDate,
    //     endDate,
    //     merchantId: data.data.id,
    //     locationId: data.data.locations[0].id,
    //     offerId: latestOffer.id,
    //     isPrimary: false
    //   },
    //   token
    // );
    if (data.data.locations[0].offers.length > 0) {
      for(let i=0 ; i<data.data.locations[0].offers.length; i++) {
        if(data.data.locations[0].offers[i].status === status && data.data.locations[0].offers[i].offerCategory === offerCategory) { 
          checkCounter = true;
          previousOfferId = data.data.locations[0].offers[i].id;
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
            merchantId: data.data.id,
            locationId: data.data.locations[0].id,
            offerId: latestOffer.id,
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
            merchantId: data.data.id,
            locationId: data.data.locations[0].id,
            offerId: latestOffer.id,
            isPrimary: false
          },
          token
        ) ;
      }
      
    }
  }, [updateOffer]);

  if (isHidden) {
    return null;
  }
  const isUpdateLocation =
    data.data.locations && data.data.locations.length > 0;
  // console.log("SAGAR OFFER DATA>>>>>>>>>>", data.data)
  const isUpdateLocationOffer =
    data.data.locations &&
    data.data.locations.length > 0 &&
    data.data.locations[0].offers.length > 1;

  return (
    <Form
      formData={formData.current}
      colCount={2}
      disabled={isCreatingLocationOffer}
    >
      <Item
        dataField={"offerType"}
        editorType={"dxSelectBox"}
        editorOptions={{ typeEditorOptions, items: offerType }}
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
      <Item dataField={"startDate"} editorOptions={dateEditorOptions}>
        <Label text="Start Date/Time" />
        <RequiredRule message="startDate is required" />
      </Item>
      <Item dataField={"endDate"} editorOptions={dateEditorOptions}>
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
        <GroupItem colCount={1}>
          <ButtonItem>
            <ButtonOptions
              useSubmitBehavior={true}
              onClick={onCreateLocationOffer}
              disabled={!isUpdateLocation}
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
                  "Create Offer"
                )}
              </span>
            </ButtonOptions>
          </ButtonItem>
        </GroupItem>
      )}
      <ButtonItem>
        <ButtonOptions text={"cancel"} width={"100%"} onClick={onCancel} />
      </ButtonItem>
    </Form>
  );
}
OffersTab.propTypes = {
  data: PropTypes.object,
  createOffer: PropTypes.func.isRequired,
  updateOffer: PropTypes.func.isRequired,
  isCreatingLocationOffer: PropTypes.bool
};

const mapDispatchToProps = {
  createOffer: Merchant.actions.createOffer,
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

const dateEditorOptions = {
  type: "datetime",
  pickerType: "calendar",
  showClearButton: true
};

export default connected(OffersTab);
