import React, { useRef, useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";
import { isAuthorized, getAccessToken } from "../../../../services/src/auth-service/firebase";
import { cloneDeep } from "lodash";
import FileUploader from "devextreme-react/file-uploader";
import List from "devextreme-react/list";
import { Merchant } from "../../../../business-layer/reducers";
import { getStatus } from "../../../../services/src/api/models/client";
import PropTypes from "prop-types";
import "devextreme-react/text-area";
import LoadIndicator from "devextreme-react/load-indicator";
import { Button } from "devextreme-react/button";
import Form, {
  Item,
  Label,
  ButtonItem,
  ButtonOptions,
  RequiredRule
} from "devextreme-react/form";
import { getSystemParameters } from "../../../../services/src/api/models/client";
import { UploadURI, ImageURI } from "../../../../app-config";
import "./info-tab.scss";
import notify from "devextreme/ui/notify";

const dropDown = ["Restaurants", "Pubs", "Salons"];
function InfoTab({
  data,
  updateMerchant,
  isSyncMerchant,
  isUpdatingMerchant,
  syncMerchant,
  approveUser,
  isApproveMerchant
}) {
  //let formData = useRef([]);
  let formData = useRef({});
  const merchant = cloneDeep(data.data);
  const authStatus = isAuthorized();
  const merchantId = merchant.id;
  const [categoryType, setCategoryType] = useState([]);
  const [statusArray, setStatusArray] = useState([]);
  const [imageU, imageUrl] = useState(merchant.imageUrls);
  const [logoUrl, logoUrls] = useState(merchant.logoUrl);
  const [header, setHeader] = useState({});
  const [logoHeader, setLogoHeader] = useState({});
  const notificationText = "Add Bank Details for Making Status Active";

  useEffect(() => {
    Status();
    categoryStatus();
    formData.current.images = imageU;
  }, [imageU]);
  useEffect(() => {
    getAccessToken().then(token => {
      setHeader({
        Authorization: `Bearer ${token}`,
        reference: "merchants"
      });
      setLogoHeader({
        Authorization: `Bearer ${token}`,
        reference: "merchantlogo"
      });
    });
  }, [authStatus]);
  useEffect(() => {
    logoUrls(logoUrl);
    formData.current.logoUrl = logoUrl;
  }, [logoUrl]);
  const renderImageCell = data => {
    return (
      <div className="product">
        <img src={`${ImageURI}${data.url}`} />
        <Button text="Remove" onClick={() => removeImage(data)} />
      </div>
    );
  };
  const removeImage = data => {
    console.log(data);
    let deletedImage = imageU.filter(x => x.id != data.id);
    deletedImage.forEach((img, index) => {
      return (img.priority = index + 1);
    });
    imageUrl(deletedImage);
    console.log(imageU);
  };
  const onFileUpload = e => {
    if (e && e.request.response) {
      let imageDetails = JSON.parse(e.request.response);

      const { imageURL: url, thumbNailImageURL: thumbUrl } = imageDetails.data;

      imageUrl([...imageU, { url, thumbUrl, priority: imageU.length + 1 }]);
    }
  };

  const onLogoUpload = async e => {
    if (e && e.request.response) {
      let logoDetails = JSON.parse(e.request.response);

      const { imageURL } = logoDetails.data;

      await logoUrls(imageURL);
    }
  };
  const onSyncMerchant = useCallback(async () => {
    const token = await getAccessToken();
    await syncMerchant(merchantId, token);
  }, [syncMerchant]);

  const onApprovedMerchant = useCallback(async () => {
    const token = await getAccessToken();
    await approveUser(merchantId, token);
  }, [approveUser]);

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
      apiResponce.data.merchantCategories.forEach(e => {
        let obj = e.name;
        categoryType.push(obj);
      });
    }
    setCategoryType(categoryType);
  };
  const onUpdateMerchant = () => {
    const {
      name,
      description,
      emailId,
      firstName,
      lastName,
      mobileNumber,
      phoneNumber,
      category,
      id,
      status
    } = merchant;
    const { images: imageUrls } = formData.current;
    const { logoUrl } = formData.current;
    if (
      merchant &&
      merchant.accounts.length > 0 &&
      merchant.accounts[0].status == "INACTIVE" &&
      status == "ACTIVE"
    ) {
      return notify(notificationText, "error", 2000);
    }
    if (!name || !description || !emailId || !firstName || !lastName || !mobileNumber || !phoneNumber || !category) {
      return
    }
    getAccessToken().then(token => {
      updateMerchant(
        {
          name,
          description,
          emailId,
          firstName,
          lastName,
          mobileNumber,
          phoneNumber,
          logoUrl,
          category,
          id,
          status,
          imageUrls
        },
        token
      );
    });

  };
  const isAlreadyInSync =
    merchant &&
    merchant.integrationData &&
    merchant.integrationData.remoteMerchantId;

  const isAlreadyInApprove =
    merchant &&
    merchant.integrationData &&
    merchant.integrationData.remoteMerchantUserAccountId;
  const isSyncHide =
    data.data.locations.length > 0 && data.data.locations[0].offers.length > 0;
  return (
    <React.Fragment>
      <Form formData={merchant} colCount={2} disabled={isUpdatingMerchant}>
        <Item
          disabled={!isAlreadyInSync}
          dataField={"status"}
          editorType="dxSelectBox"
          editorOptions={{ typeEditorOptions, items: statusArray }}
        >
          <Label text={"Status"} />
        </Item>
        {isAlreadyInSync ? (
          <ButtonItem disabled={isAlreadyInApprove}>
            <ButtonOptions
              type={"default"}
              onClick={onApprovedMerchant}
              width="100%"
            >
              <span className="dx-button-text">
                {isApproveMerchant ? (
                  <LoadIndicator
                    width={"24px"}
                    height={"24px"}
                    visible={true}
                  />
                ) : (
                  "Approve-User"
                )}
              </span>
            </ButtonOptions>
          </ButtonItem>
        ) : isSyncHide ? (
          <ButtonItem disabled={isAlreadyInSync}>
            <ButtonOptions
              type={"default"}
              onClick={onSyncMerchant}
              width="100%"
            >
              <span className="dx-button-text">
                {isSyncMerchant ? (
                  <LoadIndicator
                    width={"24px"}
                    height={"24px"}
                    visible={true}
                  />
                ) : (
                  "Sync-Merchant"
                )}
              </span>
            </ButtonOptions>
          </ButtonItem>
        ) : (
          <Item />
        )}
        <Item dataField={"name"} editorType={"dxTextBox"} >
          <RequiredRule message="Name is required" />
        </Item>
        <Item dataField={"description"} editorType={"dxTextBox"}>
          <RequiredRule message="Description is required" />
        </Item>
        <Item dataField={"firstName"} editorType={"dxTextBox"} >
          <RequiredRule message="Firstname is required" />
        </Item>
        <Item dataField={"lastName"} editorType={"dxTextBox"}>
          <RequiredRule message="Lastname is required" />
        </Item>
        <Item dataField={"mobileNumber"} editorType={"dxNumberBox"} >
          <RequiredRule message="MobileNumber is required" />
        </Item>
        <Item dataField={"phoneNumber"} editorType={"dxNumberBox"} >
          <RequiredRule message="phoneNumber is required" />
        </Item>
        <Item dataField={"emailId"} editorType={"dxTextBox"} >
          <RequiredRule message="emailId is required" />
        </Item>
        {/* <Item dataField={"logoUrl"} editorType={"dxTextBox"} /> */}
        <Item
          dataField={"category"}
          editorType="dxSelectBox"
          editorOptions={{ items: dropDown }}
        >
          <Label text={"Category"} />
        </Item>
        <Item>
          <div className="product">
            <img src={`${ImageURI}${merchant.logoUrl}`} />
          </div>

          <Label text={"Logo"} />
        </Item>
        <Item>
          <List
            dataSource={imageU}
            height="100%"
            itemRender={renderImageCell}
          />
        </Item>
        <Item dataField={"Logo"}>
          <FileUploader
            multiple={false}
            accept={"*"}
            uploadMode={"instantly"}
            uploadUrl={UploadURI}
            uploadHeaders={logoHeader}
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
          <Label text={"Images Upload"} />
        </Item>
        <ButtonItem>
          <ButtonOptions
            type={"default"}
            onClick={onUpdateMerchant}
            width={"100%"}
          >
            <span className="dx-button-text">
              {isUpdatingMerchant ? (
                <LoadIndicator width={"24px"} height={"24px"} visible={true} />
              ) : (
                "Update Merchant"
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
  updateMerchant: PropTypes.func.isRequired,
  isSyncMerchant: PropTypes.bool,
  isApproveMerchant: PropTypes.bool,
  isUpdatingMerchant: PropTypes.bool
};

const mapDispatchToProps = {
  updateMerchant: Merchant.actions.updateMerchant,
  syncMerchant: Merchant.actions.syncMerchant,
  approveUser: Merchant.actions.approveUser
};

const mapStateToProps = state => ({
  isSyncMerchant: Merchant.selectors.isSyncMerchant(state),
  isUpdatingMerchant: Merchant.selectors.isUpdatingMerchant(state),
  isApproveMerchant: Merchant.selectors.isApproveMerchant(state)
});
const connected = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default connected(InfoTab);
