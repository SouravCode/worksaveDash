import React, { useRef, useEffect, useState, useCallback } from "react";
import "devextreme-react/text-area";
import LoadIndicator from "devextreme-react/load-indicator";
import Form, {
  Item,
  Label,
  ButtonItem,
  ButtonOptions,
  GroupItem,
  SimpleItem,
  RequiredRule
} from "devextreme-react/form";
import FileUploader from "devextreme-react/file-uploader";
import List from "devextreme-react/list";
import { cloneDeep } from "lodash";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Merchant } from "../../../../../../business-layer/reducers";
import { UploadURI, ImageURI } from "../../../../../../app-config";
import { getAccessToken } from "../../../../../../services/src/auth-service/firebase";

function InfoTab({ data, updateProduct, isUpdatingProduct }) {
  const productDetails = cloneDeep(data.data);
  let formData = useRef({});
  const [imageUpdate, imageUrl] = useState(productDetails.imageUrls);
  const [header, setHeader] = useState(null);

  useEffect(async () => {
    const token = await getAccessToken();
    setHeader({
      Authorization: `Bearer ${token}`,
      reference: "merchants"
    });
  }, []);
  useEffect(() => {
    formData.current.images = imageUpdate;
  }, [imageUpdate]);
  const renderImageCell = data => {
    return (
      <div className="product">
        <img src={`${ImageURI}${data.url}`} />
      </div>
    );
  };
  const onFileUpload = e => {
    if (e && e.request.response) {
      let imageDetails = JSON.parse(e.request.response);

      const { imageURL: url, thumbNailImageURL: thumbUrl } = imageDetails.data;

      imageUrl([
        ...imageUpdate,
        { url, thumbUrl, priority: imageUpdate.length + 1 }
      ]);
    }
  };
  const onUpdateProduct = useCallback(async () => {
    const { name, description, price, priority } = productDetails;
    const { images: imageUrls } = formData.current;
    if (!name || !description || !price || !priority) {
      return;
    }
    const token = await getAccessToken();
    await updateProduct(
      {
        name,
        description,
        price,
        imageUrls,
        id: productDetails.merchantId,
        locationId: productDetails.locationId,
        productId: productDetails.id,
        priority
      },
      token
    );
  }, [updateProduct]);

  return (
    <React.Fragment>
      <Form formData={productDetails} colCount={1} disabled={isUpdatingProduct}>
        <GroupItem colCount={2}>
          <Item dataField={"name"} editorType={"dxTextBox"}>
            <RequiredRule message="name is required" />
          </Item>
          <Item dataField={"description"} editorType={"dxTextBox"}>
            <RequiredRule message="description is required" />
          </Item>
          <Item dataField={"price"} editorType={"dxNumberBox"}>
            <RequiredRule message="price is required" />
          </Item>
          <Item dataField={"priority"} editorType={"dxTextBox"}>
            <RequiredRule message="priority is required" />
          </Item>
        </GroupItem>

        {/* <GroupItem caption="ImageUrls">
          <Item dataField={"url"} editorType={"dxTextBox"} />
          <Item dataField={"priority"} editorType={"dxTextBox"} />
          <Item dataField={"thumbUrl"} editorType={"dxTextBox"} />
        </GroupItem>
        <ButtonItem>
          <ButtonOptions text={"Add More"} onClick={newField} />
        </ButtonItem> */}
        <Item />
        <Item>
          <List
            dataSource={productDetails.imageUrls}
            height="100%"
            itemRender={renderImageCell}
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
        </Item>
        <ButtonItem>
          <ButtonOptions
            type={"default"}
            onClick={onUpdateProduct}
            width="100%"
          >
            <span className="dx-button-text">
              {isUpdatingProduct ? (
                <LoadIndicator width={"24px"} height={"24px"} visible={true} />
              ) : (
                "Update Product"
              )}
            </span>
          </ButtonOptions>
        </ButtonItem>
      </Form>
    </React.Fragment>
  );
}
InfoTab.propTypes = {
  data: PropTypes.object,
  updateProduct: PropTypes.func.isRequired,
  isUpdatingProduct: PropTypes.bool
};

const mapDispatchToProps = {
  updateProduct: Merchant.actions.updateProduct
};
const mapStateToProps = state => ({
  isUpdatingProduct: Merchant.selectors.isUpdatingProduct(state)
});
const connected = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connected(InfoTab);
