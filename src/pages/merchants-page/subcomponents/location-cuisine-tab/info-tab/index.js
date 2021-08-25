import React, { useRef, useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";
import { cloneDeep } from "lodash";
import PropTypes from "prop-types";
import LoadIndicator from "devextreme-react/load-indicator";
import "devextreme-react/text-area";
import Form, {
  Item,
  Label,
  ButtonItem,
  ButtonOptions
} from "devextreme-react/form";
import { Merchant } from "../../../../../business-layer/reducers";
import { getSystemParameters } from "../../../../../services/src/api/models/client";
import { getAccessToken } from "../../../../../services/src/auth-service/firebase";
const cuisinesTyp = [
  "Chinese",
  "Continental",
  "Desserts",
  "Fast Food",
  "Halal",
  "Healthy",
  "Indian",
  "Italian",
  "Mediterranean",
  "Mexican",
  "Pizza",
  "Thai",
  "Vegan",
  "Vegetarian"
];
function InfoTab({ data, updateLocationCuisine, isUpdatingLocationCuisine }) {
  const [cuisinesType, setCuisinesTypes] = useState([]);
  const customer = cloneDeep(data.data);
  console.log(data.data);
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
      setCuisinesTypes(cuisinesType);
    }
  };
  const onupdateLocationCuisine = async () => {
    const { name, priority } = customer;
    const token = await getAccessToken();
    await updateLocationCuisine(
      {
        name,
        priority,
        merchantId: customer.merchantId,
        locationId: customer.locationId,
        cuisineId: customer.id
      },
      token
    );
  };
  return (
    <React.Fragment>
      <Form>
        <Item />
      </Form>
      <Form
        formData={customer}
        colCount={2}
        disabled={isUpdatingLocationCuisine}
      >
        <Item
          dataField={"name"}
          editorType="dxSelectBox"
          editorOptions={{ typeEditorOptions, items: cuisinesTyp }}
        >
          <Label text={"Name"} />
        </Item>
        <Item dataField={"priority"} editorType={"dxNumberBox"}>
          <Label text={"Priority"} />
        </Item>
        <ButtonItem>
          <ButtonOptions
            onClick={onupdateLocationCuisine}
            type={"default"}
            width={"100%"}
            width="100%"
          >
            <span className="dx-button-text">
              {isUpdatingLocationCuisine ? (
                <LoadIndicator width={"24px"} height={"24px"} visible={true} />
              ) : (
                "UPDATE"
              )}
            </span>
          </ButtonOptions>
        </ButtonItem>
      </Form>
    </React.Fragment>
  );
}
const typeEditorOptions = { placeholder: "Category" };

InfoTab.propTypes = {
  data: PropTypes.object,
  updateLocationCuisine: PropTypes.func.isRequired,
  isUpdatingLocationCuisine: PropTypes.bool
};

const mapDispatchToProps = {
  updateLocationCuisine: Merchant.actions.updateLocationCuisine
};
const mapStateToProps = state => ({
  isUpdatingLocationCuisine: Merchant.selectors.isUpdatingLocationCuisine(state)
});
const connected = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connected(InfoTab);
