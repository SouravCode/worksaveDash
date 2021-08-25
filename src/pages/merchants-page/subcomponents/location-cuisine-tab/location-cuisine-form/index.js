import React, { useEffect, useState, useRef, useCallback } from "react";
import "devextreme-react/text-area";
import { connect } from "react-redux";
import { Merchant } from "../../../../../business-layer/reducers";
import LoadIndicator from "devextreme-react/load-indicator";
import { getSystemParameters } from "../../../../../services/src/api/models/client";
import Form, {
  Item,
  ButtonItem,
  ButtonOptions,
  Label,
  GroupItem
} from "devextreme-react/form";
import PropTypes from "prop-types";
import { isUpdatingLocation } from "../../../../../business-layer/reducers/merchant/selectors";
import { getAccessToken } from "../../../../../services/src/auth-service/firebase";

function LocationCusinieForm({
  data,
  createLocationCuisine,
  isCreatingLocationCuisine,
  isHidden,
  onCancel
}) {
  const [cuisinesType, setCuisinesType] = useState([]);
  const formData = useRef({});
  useEffect(() => {
    Status();
  }, []);

  const Status = async () => {
    let type = "redeemStatus";
    const token = await getAccessToken();
    const apiResponce = await getSystemParameters(type, token);
    if (apiResponce) {
      apiResponce.data.cuisinesCategory.map(e => {
        cuisinesType.push(e.name);
      });
    }
    setCuisinesType(cuisinesType);
  };
  const onCreateLocationCuisine = useCallback(async () => {
    const { priority, name } = formData.current;
    const token = await getAccessToken();
    await createLocationCuisine(
      {
        priority,
        name,
        merchantId: data.data.id,
        locationId: data.data.locations[0].id
      },
      token
    );
  }, [createLocationCuisine]);

  if (isHidden) {
    return null;
  }

  const isUpdateLocationOffer =
    data.data.locations && data.data.locations.length > 0;
  return (
    <Form
      formData={formData.current}
      colCount={2}
      disabled={isCreatingLocationCuisine}
    >
      <Item
        dataField={"name"}
        editorType={"dxSelectBox"}
        editorOptions={{ typeEditorOptions, items: cuisinesType }}
      >
        <Label text={"Name"} />
      </Item>
      <Item dataField={"priority"} editorType={"dxTextBox"} />
      <GroupItem colCount={1}>
        <ButtonItem>
          <ButtonOptions
            onClick={onCreateLocationCuisine}
            type={"default"}
            width={"100%"}
            disabled={!isUpdateLocationOffer}
          >
            <span className="dx-button-text">
              {isCreatingLocationCuisine ? (
                <LoadIndicator width={"24px"} height={"24px"} visible={true} />
              ) : (
                "CREATE"
              )}
            </span>
          </ButtonOptions>
        </ButtonItem>
      </GroupItem>
      <ButtonItem>
        <ButtonOptions text={"cancel"} width={"100%"} onClick={onCancel} />
      </ButtonItem>
    </Form>
  );
}
LocationCusinieForm.propTypes = {
  data: PropTypes.object,
  createLocationCuisine: PropTypes.func.isRequired,
  isCreatingLocationCuisine: PropTypes.bool
};

const mapDispatchToProps = {
  createLocationCuisine: Merchant.actions.createLocationCuisine
};

const mapStateToProps = state => ({
  isCreatingLocationCuisine: Merchant.selectors.isCreatingLocationCuisine(state)
});
const connected = connect(
  mapStateToProps,
  mapDispatchToProps
);
const typeEditorOptions = { placeholder: "Eligible" };

export default connected(LocationCusinieForm);
