import PropTypes from "prop-types";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { connect } from "react-redux";
import FileUploader from "devextreme-react/file-uploader";
import Form, {
  Item,
  Label,
  ButtonItem,
  ButtonOptions,
  RequiredRule
} from "devextreme-react/form";
import LoadIndicator from "devextreme-react/load-indicator";

import { Merchant } from "../../../../business-layer/reducers";
import { UploadURI } from "../../../../app-config";
import "./merchant-form.scss";
import { getSystemParameters } from "../../../../services/src/api/models/client";
import { getAccessToken } from "../../../../services/src/auth-service/firebase";
//const dropDown = ["Restaurant", "Pubs", "Saloon"];

function MerchantForm({ createMerchant, isCreating, isHidden, onCancel }) {
  const [formData, setformData] = useState(useRef({}));
  const [categoryType, setCategoryType] = useState([]);
  const [header, setHeader] = useState(null);
  const [LogoHeader, setLogoHeader] = useState(null);


  const [imageUrls, imageUrl] = useState([]);
  useEffect(() => {
    Status();
    setHeaders();
  }, []);

  const setHeaders = async () => {
    const token = await getAccessToken();
    setHeader({
      Authorization: `Bearer ${token}`,
      reference: "merchants"
    });
    setLogoHeader({
      Authorization: `Bearer ${token}`,
      reference: "merchantlogo"
    });
  };


  const Status = async () => {
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
  const [logoUrl, logoUrls] = useState("");

  useEffect(() => {
    imageUrl(imageUrls);
    formData.current.imageUrls = imageUrls;
  }, [imageUrls]);
  useEffect(() => {
    logoUrls(logoUrl);
    formData.current.logoUrl = logoUrl;
  }, [logoUrl]);
  useEffect(() => {
    if (!isHidden && !isCreating) {
      // formData.current = {};
      onCancel();
    }
  }, [isCreating]);

  let form = useRef({});
  const clearState = () => {
    setformData(form);
  };
  const onReset = () => {
    if (formData && formData.current) {
      setformData(
        delete formData.current.name,
        delete formData.current.description,
        delete formData.current.category,
        delete formData.current.logoUrl,
        delete formData.current.emailId,
        delete formData.current.imageUrls
      );
    }
    clearState();
  };
  const onSubmit = async e => {
    e.preventDefault();
    const {
      name,
      description,
      category,
      logoUrl,
      emailId,
      firstName,
      lastName,
      mobileNumber,
      phoneNumber,
      imageUrls
    } = formData.current;
    const token = await getAccessToken();

    await createMerchant(
      {
        name,
        description,
        emailId,
        firstName,
        lastName,
        mobileNumber,
        phoneNumber,
        category,
        logoUrl,
        imageUrls,
        password: "Password!1"
      },
      token
    );
    onReset();
  };

  if (isHidden) {
    return null;
  }
  const onFileUpload = async e => {
    if (e && e.request.response) {
      let imageDetails = JSON.parse(e.request.response);

      const { imageURL: url, thumbNailImageURL: thumbUrl } = imageDetails.data;

      await imageUrl([
        ...imageUrls,
        { url, thumbUrl, priority: imageUrls.length + 1 }
      ]);
    }
  };
  const onLogoUpload = async e => {
    if (e && e.request.response) {
      let logoDetails = JSON.parse(e.request.response);

      const { imageURL } = logoDetails.data;

      await logoUrls(imageURL);
    }
  };
  return (
    <form className={"merchant-form"} onSubmit={onSubmit}>
      <Form formData={formData.current} disabled={isCreating} colCount={2}>
        <Item
          dataField="category"
          editorType="dxSelectBox"
          editorOptions={{
            items: categoryType
          }}
        >
          <RequiredRule message="Type is required" />
        </Item>
        <Item />
        <Item
          dataField={"name"}
          editorType={"dxTextBox"}
          editorOptions={nameEditorOptions}
        >
          <RequiredRule message="Name is required" />
          <Label visible={false} />
        </Item>

        <Item
          dataField={"description"}
          editorType={"dxTextBox"}
          editorOptions={descriptionEditorOptions}
        >
          <RequiredRule message="Description is required" />
          <Label visible={false} />
        </Item>
        <Item
          dataField={"firstName"}
          editorType={"dxTextBox"}
          editorOptions={firstNameEditorOptions}
        >
          <RequiredRule message="firstName is required" />
          <Label visible={false} />
        </Item>
        <Item
          dataField={"lastName"}
          editorType={"dxTextBox"}
          editorOptions={lastNameEditorOptions}
        >
          <RequiredRule message="lastName is required" />
          <Label visible={false} />
        </Item>
        <Item
          dataField={"phoneNumber"}
          editorType={"dxTextBox"}
          editorOptions={phoneEditorOptions}
        >
          <RequiredRule message="phoneNumber is required" />
          <Label visible={false} />
        </Item>
        <Item
          dataField={"mobileNumber"}
          editorType={"dxTextBox"}
          editorOptions={mobileEditorOptions}
        >
          <RequiredRule message="mobileNumber is required" />
          <Label visible={false} />
        </Item>
        <Item
          dataField={"emailId"}
          editorType={"dxTextBox"}
          editorOptions={emailEditorOptions}
        >
          <RequiredRule message="Email is required" />
          <Label visible={false} />
        </Item>
        <Item />
        <Item dataField={"Logo"}>
          <FileUploader
            multiple={false}
            accept={"*"}
            uploadMode={"instantly"}
            uploadUrl={UploadURI}
            uploadHeaders={LogoHeader}
            onUploaded={onLogoUpload}
          />
        </Item>
        <Item>
          <FileUploader
            multiple={true}
            accept={"*"}
            uploadMode={"instantly"}
            uploadUrl={UploadURI}
            uploadHeaders={header}
            onUploaded={onFileUpload}
          />
          <Label text="IMAGE URL:" />
        </Item>
        <ButtonItem>
          <ButtonOptions
            width={"100%"}
            type={"default"}
            useSubmitBehavior={true}
          >
            <span className="dx-button-text">
              {isCreating ? (
                <LoadIndicator width={"24px"} height={"24px"} visible={true} />
              ) : (
                "Create"
              )}
            </span>
          </ButtonOptions>
        </ButtonItem>
        <ButtonItem>
          <ButtonOptions text={"Cancel"} width={"100%"} onClick={onCancel} />
        </ButtonItem>
      </Form>
    </form>
  );
}

const typeEditorOptions = { placeholder: "Category" };
const nameEditorOptions = {
  stylingMode: "filled",
  placeholder: "Merchant Name",
  mode: "text"
};
const descriptionEditorOptions = {
  stylingMode: "filled",
  placeholder: "Description",
  mode: "text"
};
const emailEditorOptions = {
  stylingMode: "filled",
  placeholder: "Email Id",
  mode: "text"
};
const firstNameEditorOptions = {
  stylingMode: "filled",
  placeholder: "First Name",
  mode: "text"
};
const lastNameEditorOptions = {
  stylingMode: "filled",
  placeholder: "Last Name",
  mode: "text"
};
const mobileEditorOptions = {
  stylingMode: "filled",
  placeholder: "Mobile Number",
  mode: "text"
};
const phoneEditorOptions = {
  stylingMode: "filled",
  placeholder: "Phone Number",
  mode: "text"
};
const thumUrlEditorOptions = {
  stylingMode: "filled",
  placeholder: "Thumbnail URL",
  mode: "text"
};
MerchantForm.propTypes = {
  createMerchant: PropTypes.func.isRequired,
  isCreating: PropTypes.bool,
  isHidden: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  createMerchant: Merchant.actions.createMerchant
};

const mapStateToProps = state => ({
  isCreating: Merchant.selectors.isCreating(state)
});

const connected = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connected(MerchantForm);
