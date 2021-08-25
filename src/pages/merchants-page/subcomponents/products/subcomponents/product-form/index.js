import React, { useEffect, useState, useRef, useCallback } from "react";
import "devextreme-react/text-area";
import { connect } from "react-redux";
import FileUploader from "devextreme-react/file-uploader";
import { UploadURI } from "../../../../../../app-config";
import LoadIndicator from "devextreme-react/load-indicator";
import Form, {
  Item,
  ButtonItem,
  ButtonOptions,
  GroupItem,
  SimpleItem,
  RequiredRule
} from "devextreme-react/form";
import { Merchant } from "../../../../../../business-layer/reducers";
import { Button } from "devextreme-react/button";
import PropTypes from "prop-types";
import { getAccessToken } from "../../../../../../services/src/auth-service/firebase";
function ProductForm({
  data,
  createProduct,
  isHidden,
  isCreatingProduct,
  onCancel
}) {
  const formData = useRef({});
  const [header, setHeader] = useState(null);

  useEffect(async () => {
    const token = await getAccessToken();
    setHeader({
      Authorization: `Bearer ${token}`,
      reference: "merchants"
    });
  }, []);
  const [imageUrls, imageUrl] = useState([]);

  useEffect(() => {
    imageUrl(imageUrls);
    formData.current.imageUrls = imageUrls;
  }, [imageUrls]);
  const onCreateProduct = useCallback(async () => {
    const { name, description, price, imageUrls } = formData.current;
    if (!name || !description || !price) {
      return;
    }
    const token = await getAccessToken();
    await createProduct(
      {
        name,
        description,
        price,
        imageUrls,
        id: data.data.id,
        locationId: data.data.locations[0].id
      },
      token
    );
  }, [createProduct]);

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
  const newField = () => {
    let obj = {
      priority: "",
      url: ""
    };
  };
  const isUpdateLocation =
    data.data.locations && data.data.locations.length > 0;
  return (
    <Form formData={formData.current} disabled={isCreatingProduct}>
      <Item dataField={"name"} editorType={"dxTextBox"}>
        <RequiredRule message="Name is required" />
      </Item>
      <Item dataField={"description"} editorType={"dxTextBox"}>
        <RequiredRule message="Description is required" />
      </Item>
      <Item dataField={"price"} editorType={"dxNumberBox"}>
        <RequiredRule message="Price is required" />
      </Item>
      <Item />
      {/* <GroupItem caption="ImageUrls" colCount={2}>
        <SimpleItem dataField={"url"} editorOptions={"dxTextBox"} />
        <SimpleItem dataField={"priority"} editorOptions={"dxTextBox"} />
        <SimpleItem dataField={"thumbUrl"} editorOptions={"dxTextBox"} />
        <ButtonItem>
          <ButtonOptions text={"Add More"} onClick={newField} />
        </ButtonItem>
      </GroupItem> */}

      <Item>
        <FileUploader
          multiple={true}
          accept={"*"}
          uploadMode={"instantly"}
          uploadUrl={UploadURI}
          uploadHeaders={header}
          onUploaded={onFileUpload}
        />
      </Item>
      <Item />
      <ButtonItem>
        <ButtonOptions
          disabled={!isUpdateLocation}
          type={"default"}
          useSubmitBehavior={true}
          onClick={onCreateProduct}
          width="100%"
        >
          <span className="dx-button-text">
            {isCreatingProduct ? (
              <LoadIndicator width={"24px"} height={"24px"} visible={true} />
            ) : (
              "Create Product"
            )}
          </span>
        </ButtonOptions>
      </ButtonItem>
      <ButtonItem>
        <ButtonOptions text={"Cancel"} width={"100%"} onClick={onCancel} />
      </ButtonItem>
    </Form>
  );
}
ProductForm.propTypes = {
  data: PropTypes.object,
  createProduct: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isHidden: PropTypes.bool.isRequired,
  isCreatingProduct: PropTypes.bool
};

const mapDispatchToProps = {
  createProduct: Merchant.actions.createProduct
};

const mapStateToProps = state => ({
  isCreatingProduct: Merchant.selectors.isCreatingProduct(state)
});

const connected = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connected(ProductForm);
