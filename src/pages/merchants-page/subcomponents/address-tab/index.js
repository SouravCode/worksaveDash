import React, { useCallback } from "react";
import { connect } from "react-redux";
import { getAccessToken } from "../../../../services/src/auth-service/firebase";
import LoadIndicator from "devextreme-react/load-indicator";
import Form, {
  Item,
  ButtonItem,
  ButtonOptions,
  Label,
  GroupItem,
  RequiredRule
} from "devextreme-react/form";
import PropTypes from "prop-types";
import { cloneDeep } from "lodash";
import { Merchant } from "../../../../business-layer/reducers";
const Country = ["GBR"];
const Currency = ["GBP"];
function AddressTab({
  data,
  createLocation,
  isCreatingLocation,
  isSyncLocation,
  updateLocation,
  syncLocation
}) {
  let locationDetails =
    data.data && data.data.locations[0]
      ? cloneDeep(data.data.locations[0])
      : {
        city: "",
        country: "",
        currency: "",
        latitude: "",
        line1: "",
        line2: "",
        longitude: "",
        state: "",
        zip: ""
      };

  const onSyncLocation = useCallback(async () => {
    const merchantId = data.data.id;
    const locationId = locationDetails.id;
    const token = await getAccessToken();
    await syncLocation({ merchantId, locationId }, token);
  }, [syncLocation]);

  const onCreateLocation = useCallback(async () => {
    const merchantId = data.data.id;
    if (
      !locationDetails.state ||
      !locationDetails.city ||
      !locationDetails.zip ||
      !locationDetails.currency ||
      !locationDetails.latitude ||
      !locationDetails.longitude ||
      !locationDetails.country ||
      !locationDetails.line1 ||
      !locationDetails.line2
    ) {
      return;
    }
    const token = await getAccessToken();
    await createLocation(
      {
        ...locationDetails,
        merchantId
      },
      token
    );
  }, [createLocation]);

  const onUpdateLocation = useCallback(async () => {
    const merchantId = data.data.id;
    if (
      !locationDetails.state ||
      !locationDetails.city ||
      !locationDetails.zip ||
      !locationDetails.currency ||
      !locationDetails.latitude ||
      !locationDetails.longitude ||
      !locationDetails.country ||
      !locationDetails.line1 ||
      !locationDetails.line2
    ) {
      return;
    }
    const token = await getAccessToken();
    await updateLocation(
      {
        ...locationDetails,
        merchantId,
        locationId: locationDetails.id
      },
      token
    );
  }, [updateLocation]);

  const isAlreadyInSync =
    locationDetails &&
    locationDetails.integrationData &&
    locationDetails.integrationData.remoteLocationId;
  const isSyncHide =
    (data.data.locations.length > 0 &&
      data.data.locations[0].offers.length > 0 &&
      data.data.integrationData &&
      data.data.integrationData.remoteMerchantId) ||
    (data.data.locations.length > 0 &&
      data.data.locations[0].offers.length > 0 &&
      data.data.integrationData &&
      data.data.integrationData.remoteMerchantUserAccountId);
  const isUpdateLocation = locationDetails && locationDetails.id;
  return (
    <React.Fragment>
      <Form
        formData={locationDetails}
        colCount={2}
        disabled={isCreatingLocation}
      >
        <Item />
        {!isSyncHide ? (
          <Item />
        ) : (
          <ButtonItem disabled={isAlreadyInSync}>
            <ButtonOptions
              type={"default"}
              onClick={onSyncLocation}
              width="100%"
            >
              <span className="dx-button-text">
                {isSyncLocation ? (
                  <LoadIndicator
                    width={"24px"}
                    height={"24px"}
                    visible={true}
                  />
                ) : (
                  "Sync-Location"
                )}
              </span>
            </ButtonOptions>
          </ButtonItem>
        )}
        <Item dataField={"line1"} editorType={"dxTextBox"}>
          <RequiredRule message="line1 is required" />
        </Item>
        <Item dataField={"line2"} editorType={"dxTextBox"}>
          <RequiredRule message="line2 is required" />
        </Item>
        <Item dataField={"city"} editorType={"dxTextBox"}>
          <RequiredRule message="city is required" />
        </Item>
        <Item dataField={"state"} editorType={"dxTextBox"}>
          <RequiredRule message="state is required" />
        </Item>
        <Item dataField={"zip"} editorType={"dxTextBox"}>
          <RequiredRule message="zip is required" />
        </Item>
        <Item
          dataField={"country"}
          editorType={"dxSelectBox"}
          editorOptions={{ typeEditorOptions, items: Country }}
        >
          <Label text={"Country"} />
          <RequiredRule message="country is required" />
        </Item>
        <Item dataField={"latitude"} editorType={"dxTextBox"}>
          <RequiredRule message="latitude is required" />
        </Item>
        <Item dataField={"longitude"} editorType={"dxTextBox"}>
          <RequiredRule message="longitude is required" />
        </Item>
        <Item
          dataField={"currency"}
          editorType={"dxSelectBox"}
          editorOptions={{ typeEditorOptions, items: Currency }}
        >
          <Label text={"Currency"} />
          <RequiredRule message="currency is required" />
        </Item>
        <Item />
        {isUpdateLocation ? (
          <GroupItem colCount={1}>
            <ButtonItem>
              <ButtonOptions
                useSubmitBehavior={true}
                onClick={onUpdateLocation}
                type={"default"}
                width={"100%"}
              >
                <span className="dx-button-text">
                  {isCreatingLocation ? (
                    <LoadIndicator
                      width={"24px"}
                      height={"24px"}
                      visible={true}
                    />
                  ) : (
                    "Update Location"
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
                onClick={onCreateLocation}
                type={"default"}
                width={"100%"}
              >
                <span className="dx-button-text">
                  {isCreatingLocation ? (
                    <LoadIndicator
                      width={"24px"}
                      height={"24px"}
                      visible={true}
                    />
                  ) : (
                    "Add location"
                  )}
                </span>
              </ButtonOptions>
            </ButtonItem>
          </GroupItem>
        )}
      </Form>
    </React.Fragment>
  );
}
const typeEditorOptions = { placeholder: "Eligible" };

AddressTab.propTypes = {
  data: PropTypes.object,
  createLocation: PropTypes.func.isRequired,
  updateLocation: PropTypes.func.isRequired,
  syncLocation: PropTypes.func.isRequired,
  isCreatingLocation: PropTypes.bool,
  isSyncLocation: PropTypes.bool
};

const mapDispatchToProps = {
  createLocation: Merchant.actions.createLocation,
  updateLocation: Merchant.actions.updateLocation,
  syncLocation: Merchant.actions.syncLocation
};

const mapStateToProps = state => ({
  isCreatingLocation: Merchant.selectors.isCreatingLocation(state),
  isSyncLocation: Merchant.selectors.isSyncLocation(state)
});

const connected = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connected(AddressTab);
