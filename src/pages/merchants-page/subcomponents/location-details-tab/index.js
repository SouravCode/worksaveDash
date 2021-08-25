import React, { useCallback, useMemo, useState, useEffect } from "react";
import { connect } from "react-redux";
import TextBox from "devextreme-react/text-box";
import { useOktaAuth } from "@okta/okta-react";
import Form, {
  Item,
  ButtonItem,
  ButtonOptions,
  Label,
  GroupItem,
  SimpleItem
} from "devextreme-react/form";
import { Button } from "devextreme-react/button";
import LoadIndicator from "devextreme-react/load-indicator";
import PropTypes from "prop-types";
import List from "devextreme-react/list";
import { cloneDeep } from "lodash";
import { getSystemParameters } from "../../../../services/src/api/models/client";
import { Merchant } from "../../../../business-layer/reducers";
import { getAccessToken } from "../../../../services/src/auth-service/firebase";
function LocationDetails({
  data,
  updateLocationDetails,
  isUpdatingLocationDetails
}) {
  const [cardType, setCardType] = useState([]);

  let VisaLength;
  let MasterCard;
  let amex;
  useEffect(() => {
    Status();
  }, []);

  const Status = async () => {
    let type = "redeemStatus";
    const token = await getAccessToken();
    const apiResponce = await getSystemParameters(type, token);
    if (apiResponce) {
      apiResponce.data.cardTypeCategory.map(e => {
        let obj = {
          cardType: e.name,
          isValid: false,
          iconUrl: e.iconUrl
        };
        cardType.push(obj);
      });
    }
    setCardType(cardType);
  };
  const LocationValues =
    data.data && data.data.locations.length > 0 ? data.data.locations[0] : [];
  const CardSchemes =
    data.data &&
      data.data.locations.length > 0 &&
      data.data.locations[0].cardSchemes.length > 0
      ? cloneDeep(data.data.locations[0].cardSchemes)
      : [
          {
            cardType: "visa",
            isValid: true,
            retailMerchantId: [],
            iconUrl: ""
          },
          {
            cardType: "mastercard",
            isValid: true,
            retailMerchantId: [],
            iconUrl: ""
          },
          {
            cardType: "amex",
            isValid: true,
            retailMerchantId: [],
            iconUrl: ""
          }
        ];
  if (CardSchemes.length > 0) {
    VisaLength = CardSchemes[0].retailMerchantId.length;
    MasterCard = CardSchemes[1].retailMerchantId.length;
    amex = CardSchemes[2].retailMerchantId.length;
  }
  const [inputFields, setInputFields] = useState(
    CardSchemes[0].retailMerchantId
  );
  const [masterCardFields, setMasterCardFields] = useState(
    CardSchemes[1].retailMerchantId
  );
  const [amexCardFields, setAmexCardFields] = useState(
    CardSchemes[2].retailMerchantId
  );
  const workingTimings =
    data.data &&
      data.data.locations.length > 0 &&
      data.data.locations[0].workingTimings.length > 0
      ? cloneDeep(data.data.locations[0].workingTimings)
      : [
        {
          weekDay: 1,
          openingTimings: "9:00",
          closingTimings: "18:00",
          isOpen: false
        },
        {
          weekDay: 2,
          openingTimings: "9:00",
          closingTimings: "18:00",
          isOpen: false
        },
        {
          weekDay: 3,
          openingTimings: "9:00",
          closingTimings: "18:00",
          isOpen: false
        },
        {
          weekDay: 4,
          openingTimings: "9:00",
          closingTimings: "18:00",
          isOpen: false
        },
        {
          weekDay: 5,
          openingTimings: "9:00",
          closingTimings: "18:00",
          isOpen: false
        },
        {
          weekDay: 6,
          openingTimings: "9:00",
          closingTimings: "18:00",
          isOpen: false
        },
        {
          weekDay: 7,
          openingTimings: "9:00",
          closingTimings: "18:00",
          isOpen: false
        }
      ];

  const contactDetails =
    data.data &&
      data.data.locations.length > 0 &&
      data.data.locations[0].contact.length > 0
      ? cloneDeep(data.data.locations[0].contact)
      : [
        {
          contactType: "EMAIL_PRIMARY",
          value: ""
        },
        {
          contactType: "PHONE_PRIMARY",
          value: ""
        },
        {
          contactType: "EMAIL_SUPPORT",
          value: ""
        },
        {
          contactType: "PHONE_SUPPORT",
          value: ""
        }
      ];
  const onLocationDetailsUpdate = async () => {
    CardSchemes.map(e => {
      if (CardSchemes.length > 0) {
        return (
          (CardSchemes[0].retailMerchantId = inputFields),
          (CardSchemes[1].retailMerchantId = masterCardFields),
          (CardSchemes[2].retailMerchantId = amexCardFields)
        );
      }
    });
    const token = await getAccessToken();
    await updateLocationDetails(
      {
        merchantId: data.data.id,
        locationId: data.data.locations[0].id,
        CardSchemes,
        workingTimings,
        contactDetails
      },
      token
    );
  };

  const isUpdateLocation =
    data.data.locations && data.data.locations.length > 0;
  const renderTimingCell = data => {
    return (
      <React.Fragment>
        <p className="dateFormat">{data.weekDay == "1" ? "SUNDAY" : ""}</p>
        <p className="dateFormat">{data.weekDay == "2" ? "MONDAY" : ""}</p>
        <p className="dateFormat">{data.weekDay == "3" ? "TUESDAY" : ""}</p>
        <p className="dateFormat">{data.weekDay == "4" ? "WEDNESDAY" : ""}</p>
        <p className="dateFormat">{data.weekDay == "5" ? "THURSDAY" : ""}</p>
        <p className="dateFormat">{data.weekDay == "6" ? "FRIDAY" : ""}</p>
        <p className="dateFormat">{data.weekDay == "7" ? "SATURDAY" : ""}</p>
        <Form formData={data} colCount={5}>
          <Item />
          <Item />
          <Item dataField="openingTimings" editorType={"dxTextBox"}>
            <Label text="*" />
          </Item>
          <Item dataField="closingTimings" editorType={"dxTextBox"}>
            <Label text="*" />
          </Item>
          <Item dataField="isOpen" editorType={"dxCheckBox"}>
            <Label text="*" />
          </Item>
        </Form>
      </React.Fragment>
    );
  };

  const renderContactCell = data => {
    return (
      <React.Fragment>
        {""}
        <p className="dateFormat">{data.contactType}</p>
        <Form formData={data} colCount={3}>
          <Item />
          <Item dataField="value" editorType={"dxTextBox"}>
            <Label text="*" />
          </Item>
        </Form>
      </React.Fragment>
    );
  };

  const handleInput = (index, event) => {
    const values = [...inputFields];
    values[index] = event.event.target.value;
    setInputFields(values);
  };
  const handleAdd = () => {
    setInputFields([...inputFields, ""]);
  };

  const handleRemove = index => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };
  const handleMasterInput = (index, event) => {
    const values = [...masterCardFields];
    values[index] = event.event.target.value;
    setMasterCardFields(values);
  };
  const handleMasterAdd = () => {
    setMasterCardFields([...masterCardFields, ""]);
  };

  const handleMasterRemove = index => {
    const values = [...masterCardFields];
    values.splice(index, 1);
    setMasterCardFields(values);
  };

  const handleAmexInput = (index, event) => {
    const values = [...amexCardFields];
    values[index] = event.event.target.value;
    setAmexCardFields(values);
  };
  const handleAmexAdd = () => {
    setAmexCardFields([...amexCardFields, ""]);
  };

  const handleAmexRemove = index => {
    const values = [...amexCardFields];
    values.splice(index, 1);
    setAmexCardFields(values);
  };
  return (
    <React.Fragment>
      <Form formData={LocationValues} colCount={3}>
        <Item>
          <Label text="Location Details:" />
        </Item>
        <Item disabled={true} dataField="line1" editorType="dxTextBox" />
        <Item disabled={true} dataField="line2" editorType="dxTextBox" />
      </Form>
      <Form
        colCount={4}
        formData={CardSchemes[0]}
        disabled={!isUpdateLocation || isUpdatingLocationDetails}
      >
        <Item>
          <Label text="Card Types:" />
        </Item>
        <Item dataField="isValid" editorType="dxCheckBox">
          <Label text="Visa" />
        </Item>
      </Form>
      <Form>
        <Item>
          <Label text={`Visa MID's (${VisaLength})`} />
        </Item>
      </Form>
      <form aria-disabled={!isUpdateLocation || isUpdatingLocationDetails}>
        {inputFields.map((input, index) => (
          <div className="dx-field">
            <div className="dx-field-value">
              <Button
                icon="minus"
                text="Remove"
                type="primary"
                stylingMode="outlined"
                onClick={() => handleRemove(index)}
              />
              <TextBox
                width={150}
                name="visa"
                Label="Visa"
                value={inputFields[index]}
                placeholder={`Visa${index + 1}`}
                onChange={event => handleInput(index, event)}
              />
            </div>
          </div>
        ))}
      </form>
      <br />
      <br />
      &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;
      &nbsp;{" "}
      <Button
        icon="plus"
        text="Visa"
        type="primary"
        stylingMode="outlined"
        onClick={() => handleAdd()}
      />
      <Form
        colCount={4}
        formData={CardSchemes[1]}
        disabled={!isUpdateLocation || isUpdatingLocationDetails}
      >
        <Item>
          <Label text="Card Types:" />
        </Item>
        <Item dataField="isValid" editorType="dxCheckBox">
          <Label text="masterCard" />
        </Item>
      </Form>
      <Form>
        <Item>
          <Label text={` MasterCard MID's (${MasterCard})`} />
        </Item>
      </Form>
      <form aria-disabled={!isUpdateLocation || isUpdatingLocationDetails}>
        {masterCardFields.map((input, index) => (
          <div className="dx-field">
            <div className="dx-field-value">
              <Button
                icon="minus"
                text="Remove"
                type="primary"
                stylingMode="outlined"
                onClick={() => handleMasterRemove(index)}
              />
              <TextBox
                width={150}
                name="masterCard"
                Label="MasterCard"
                value={masterCardFields[index]}
                placeholder={`MasterCard${index + 1}`}
                onChange={event => handleMasterInput(index, event)}
              />
            </div>
          </div>
        ))}
      </form>
      <br />
      <br />
      &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;
      &nbsp;{" "}
      <Button
        icon="plus"
        text="MasterCard"
        type="primary"
        stylingMode="outlined"
        onClick={() => handleMasterAdd()}
      />
      <Form
        colCount={4}
        formData={CardSchemes[2]}
        disabled={!isUpdateLocation || isUpdatingLocationDetails}
      >
        <Item>
          <Label text="Card Types:" />
        </Item>
        <Item dataField="isValid" editorType="dxCheckBox">
          <Label text="amex" />
        </Item>
      </Form>
      <Form>
        <Item>
          <Label text={`Amex MID's (${amex})`} />
        </Item>
      </Form>
      <form aria-disabled={!isUpdateLocation || isUpdatingLocationDetails}>
        {amexCardFields.map((input, index) => (
          <div className="dx-field">
            <div className="dx-field-value">
              <Button
                icon="minus"
                text="Remove"
                type="primary"
                stylingMode="outlined"
                onClick={() => handleAmexRemove(index)}
              />
              <TextBox
                width={150}
                name="amex"
                Label="Amex"
                value={amexCardFields[index]}
                placeholder={`Amex${index + 1}`}
                onChange={event => handleAmexInput(index, event)}
              />
            </div>
          </div>
        ))}
      </form>
      <br />
      <br />
      &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;
      &nbsp;{" "}
      <Button
        icon="plus"
        text="Amex"
        type="primary"
        stylingMode="outlined"
        onClick={() => handleAmexAdd()}
      />
      <Form colCount={5} disabled={isUpdatingLocationDetails}>
        <Item>
          <Label text="Timings:" />
        </Item>
        <Item>
          <Label text="WeekDay" />
        </Item>
        <Item>
          <Label text="Open Timings" />
        </Item>
        <Item>
          <Label text="Closed Timings" />
        </Item>
        <Item>
          <Label text="Is Open" />
        </Item>
      </Form>
      <List
        dataSource={workingTimings}
        disabled={!isUpdateLocation || isUpdatingLocationDetails}
        height="10%"
        itemRender={renderTimingCell}
      />
      <Form colCount={5} disabled={isUpdatingLocationDetails}>
        <Item>
          <Label text="Contact Details:" />
        </Item>
      </Form>
      <List
        dataSource={contactDetails}
        disabled={!isUpdateLocation || isUpdatingLocationDetails}
        height="10%"
        itemRender={renderContactCell}
      />
      <Form>
        <ButtonItem>
          <ButtonOptions
            disabled={!isUpdateLocation}
            onClick={onLocationDetailsUpdate}
            type={"default"}
            width={"100%"}
          >
            <span className="dx-button-text">
              {isUpdatingLocationDetails ? (
                <LoadIndicator width={"24px"} height={"24px"} visible={true} />
              ) : (
                "Update Location Details"
              )}
            </span>
          </ButtonOptions>
        </ButtonItem>
      </Form>
    </React.Fragment>
  );
}

LocationDetails.propTypes = {
  data: PropTypes.object,
  updateLocationDetails: PropTypes.func.isRequired,
  isUpdatingLocationDetails: PropTypes.bool
};

const mapDispatchToProps = {
  updateLocationDetails: Merchant.actions.updateLocationDetails
};

const mapStateToProps = state => ({
  isUpdatingLocationDetails: Merchant.selectors.isUpdatingLocationDetails(state)
});

const connected = connect(
  mapStateToProps,
  mapDispatchToProps
);

const typeEditorOptions = { placeholder: "Category" };

export default connected(LocationDetails);
