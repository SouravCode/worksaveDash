import React, { useRef, useCallback, useEffect, useState } from "react";
import Form, {
  Item,
  ButtonItem,
  ButtonOptions,
  GroupItem,
  Label
} from "devextreme-react/form";
import DataGrid, {
  Column,
  Paging,
  RequiredRule
} from "devextreme-react/data-grid";
import TextArea from "devextreme-react/text-area";
import LoadIndicator from "devextreme-react/load-indicator";
import { DateTime } from "luxon";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { cloneDeep } from "lodash";
import { getStatus } from "../../../../services/src/api/models/client";
import { getAccessToken } from "../../../../services/src/auth-service/firebase";

import { MerchantDashboard } from "../../../../business-layer/reducers";
import "./infoTab.scss";

const disputeType = [
  "Charge Backs",
  "Customer used vocher or existing offer",
  "Failed invoice payment by merchant",
  "Card transaction not moving from Auth to settled",
  "Other"
];

function InfoTab({
  data,
  setDisputeMessage,
  onCancel,
  visible,
  isDisputeMessageLoading
}) {
  const [statusDetails, setStatusDetails] = useState([]);
  const [formData, setformData] = useState(useRef({}));
  const merchantDetails = localStorage.getItem("merchant")
    ? JSON.parse(localStorage.getItem("merchant"))
    : "";
  useEffect(() => {
    Status();
  }, []);

  const Status = async () => {
    let type = "disputeStatus";
    const token = await getAccessToken();
    const apiResponce = await getStatus(type, token);
    setStatusDetails(apiResponce.results.data.disputeStatus);
  };
  let disputeMessages = cloneDeep(data);
  let disputeDetails = [];
  let latestDispute;

  if (data.dispute && data.dispute.length > 0) {
    latestDispute = data.dispute.slice(-1);
    disputeDetails = cloneDeep(latestDispute[0]);
  }

  useEffect(() => {
    if (visible && !isDisputeMessageLoading) {
      onCancel();
    }
  }, [isDisputeMessageLoading]);
  if (formData && formData.current) {
    formData.current.referenceId = disputeMessages.id;
  }
  let form = useRef({});
  const clearState = () => {
    setformData(form);
  };
  const onReset = () => {
    if (formData && formData.current) {
      setformData(delete formData.current.comment);
      console.log(formData);
    }
    clearState();
  };
  const onUpdateDispute = async data => {
    const merchantDetails = localStorage.getItem("merchant")
      ? JSON.parse(localStorage.getItem("merchant"))
      : "";
    const { comment, referenceId } = formData.current;
    const { type: type, status: status } = data;
    if (!comment) {
      return;
    }
    const token = await getAccessToken();
    await setDisputeMessage(
      {
        comment,
        status,
        referenceId,
        type,
        merchantId: merchantDetails.id,
        createdBy: merchantDetails.name,
        isLast: "true"
      },
      token
    );
    onReset();
  };
  const nameEditorOptions = {
    stylingMode: "filled",
    placeholder: "Text here...",
    mode: "commentbox"
  };

  const renderGridCell = data => {
    return (
      <div className={"dispute-details"}>
        {data.data.createdBy == "ADMIN" ? (
          <div className={"AdminmessageBox"}>
            <div className={"chatContainer"}>
              <div className={"user"}>
                <span>{data.data.createdBy}&nbsp;&nbsp;</span>
                <span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="6"
                      cy="6"
                      r="5.6"
                      stroke="black"
                      stroke-opacity="0.85"
                      stroke-width="0.8"
                    />
                    <rect
                      x="5"
                      y="3"
                      width="1"
                      height="4"
                      rx="0.5"
                      fill="#393939"
                    />
                    <rect
                      x="5"
                      y="7"
                      width="1"
                      height="5"
                      rx="0.5"
                      transform="rotate(-90 5 7)"
                      fill="#393939"
                    />
                  </svg>
                </span>
                &nbsp;
                <span>
                  {" "}
                  {DateTime.fromISO(data.data.modifiedDate).toFormat(
                    "dd LLL yy HH:mm"
                  )}
                </span>
              </div>
              <div className={"conversation"}>
                <p>
                  {" "}
                  {data.data.type} -- {data.data.comment}
                </p>
              </div>
              <div className={"status f-right"}>
                <span>Status</span>
                {data.data.status == "CLOSED" ? (
                  <p className={"declined"}>{data.data.status}</p>
                ) : (
                  ""
                )}
                {data.data.status == "PENDING" ? (
                  <p className={"pendingStatus"}>{data.data.status}</p>
                ) : (
                  ""
                )}
                {data.data.status !== "CLOSED" &&
                  data.data.status !== "PENDING" ? (
                  <p className={"allStatus"}>{data.data.status}</p>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        {data.data.createdBy == merchantDetails.name ? (
          <div className={"MerchantmessageBox"}>
            <div className={"chatContainer"}>
              <div className={"user"}>
                <span>{data.data.createdBy}&nbsp;&nbsp;</span>
                <span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="6"
                      cy="6"
                      r="5.6"
                      stroke="black"
                      stroke-opacity="0.85"
                      stroke-width="0.8"
                    />
                    <rect
                      x="5"
                      y="3"
                      width="1"
                      height="4"
                      rx="0.5"
                      fill="#393939"
                    />
                    <rect
                      x="5"
                      y="7"
                      width="1"
                      height="5"
                      rx="0.5"
                      transform="rotate(-90 5 7)"
                      fill="#393939"
                    />
                  </svg>
                </span>
                &nbsp;
                <span>
                  {" "}
                  {DateTime.fromISO(data.data.modifiedDate).toFormat(
                    "dd LLL yy HH:mm"
                  )}
                </span>
              </div>
              <div className={"conversation"}>
                <p>
                  {" "}
                  {data.data.type} -- {data.data.comment}
                </p>
              </div>
              <div className={"status f-left"}>
                <span>Status</span>
                {data.data.status == "CLOSED" ? (
                  <p className={"declined"}>{data.data.status}</p>
                ) : (
                  ""
                )}
                {data.data.status == "PENDING" ? (
                  <p className={"pendingStatus"}>{data.data.status}</p>
                ) : (
                  ""
                )}
                {data.data.status !== "CLOSED" &&
                  data.data.status !== "PENDING" ? (
                  <p className={"allStatus"}>{data.data.status}</p>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  };

  return (
    <React.Fragment>
      <div className="popup-modal">
        <div className="dispute-details">
          <h4 className="f-17">Details</h4>
          <div className="d-flex">
            <div className="d-label">
              <div>
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    width="36"
                    height="36"
                    rx="9"
                    fill="#1681B1"
                    fill-opacity="0.25"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="10.6"
                    stroke="#1681B1"
                    stroke-width="0.8"
                  />
                  <path
                    d="M23.2848 15.2828C23.441 15.1266 23.441 14.8734 23.2848 14.7172L20.7392 12.1716C20.583 12.0154 20.3297 12.0154 20.1735 12.1716C20.0173 12.3278 20.0173 12.581 20.1735 12.7373L22.4363 15L20.1735 17.2627C20.0173 17.419 20.0173 17.6722 20.1735 17.8284C20.3297 17.9846 20.583 17.9846 20.7392 17.8284L23.2848 15.2828ZM14.002 15.4H23.002V14.6H14.002V15.4Z"
                    fill="#1681B1"
                  />
                  <path
                    d="M13.726 20.7107C13.5663 20.8633 13.5605 21.1165 13.7131 21.2762L16.2002 23.8791C16.3528 24.0388 16.606 24.0445 16.7657 23.8919C16.9254 23.7393 16.9312 23.4861 16.7786 23.3264L14.5679 21.0128L16.8815 18.8021C17.0412 18.6495 17.047 18.3963 16.8943 18.2365C16.7417 18.0768 16.4885 18.0711 16.3288 18.2237L13.726 20.7107ZM23.0091 20.8047L14.0114 20.6L13.9932 21.3998L22.9909 21.6045L23.0091 20.8047Z"
                    fill="#1681B1"
                  />
                </svg>
              </div>
              <div>
                <p className="lable">Trans. ID</p>
                <p className="val">{disputeMessages.transactionId}</p>
              </div>
            </div>
            <div className="d-label">
              <div>
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    width="36"
                    height="36"
                    rx="9"
                    fill="#44BA93"
                    fill-opacity="0.25"
                  />
                  <rect
                    x="5"
                    y="11"
                    width="25"
                    height="14"
                    rx="1"
                    fill="#44BA93"
                  />
                  <rect x="12" y="15" width="19" height="2" fill="#CAE8DE" />
                </svg>
              </div>
              <div>
                <p className="lable">Card Number</p>
                <p className="val">{disputeMessages.cardLastNumbers}</p>
              </div>
            </div>
          </div>
          <div className="d-flex">
            <div className="d-label">
              <div>
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    width="36"
                    height="36"
                    rx="9"
                    fill="#F5A2BF"
                    fill-opacity="0.4"
                  />
                  <mask id="path-2-inside-1" fill="white">
                    <path d="M28.125 17.4375C28.125 19.5513 27.4982 21.6176 26.3238 23.3752C25.1495 25.1327 23.4803 26.5026 21.5274 27.3115C19.5745 28.1204 17.4256 28.332 15.3525 27.9196C13.2793 27.5073 11.375 26.4894 9.8803 24.9947C8.38562 23.5 7.36774 21.5957 6.95536 19.5225C6.54298 17.4494 6.75463 15.3005 7.56354 13.3476C8.37245 11.3947 9.74229 9.72553 11.4998 8.55117C13.2574 7.37681 15.3237 6.75 17.4375 6.75L17.4375 17.4375H28.125Z" />
                  </mask>
                  <path
                    d="M28.125 17.4375C28.125 19.5513 27.4982 21.6176 26.3238 23.3752C25.1495 25.1327 23.4803 26.5026 21.5274 27.3115C19.5745 28.1204 17.4256 28.332 15.3525 27.9196C13.2793 27.5073 11.375 26.4894 9.8803 24.9947C8.38562 23.5 7.36774 21.5957 6.95536 19.5225C6.54298 17.4494 6.75463 15.3005 7.56354 13.3476C8.37245 11.3947 9.74229 9.72553 11.4998 8.55117C13.2574 7.37681 15.3237 6.75 17.4375 6.75L17.4375 17.4375H28.125Z"
                    fill="#FC85AE"
                    stroke="#FC85AE"
                    stroke-width="2.25"
                    mask="url(#path-2-inside-1)"
                  />
                  <mask id="path-3-inside-2" fill="white">
                    <path d="M20.0148 4.66487C21.4182 4.68644 22.8035 4.98422 24.0918 5.54118C25.38 6.09815 26.546 6.90341 27.523 7.91097C28.5001 8.91854 29.2691 10.1087 29.7862 11.4135C30.3033 12.7182 30.5583 14.1121 30.5368 15.5154L19.8505 15.3511L20.0148 4.66487Z" />
                  </mask>
                  <path
                    d="M20.0148 4.66487C21.4182 4.68644 22.8035 4.98422 24.0918 5.54118C25.38 6.09815 26.546 6.90341 27.523 7.91097C28.5001 8.91854 29.2691 10.1087 29.7862 11.4135C30.3033 12.7182 30.5583 14.1121 30.5368 15.5154L19.8505 15.3511L20.0148 4.66487Z"
                    stroke="#FC85AE"
                    stroke-width="1.125"
                    mask="url(#path-3-inside-2)"
                  />
                </svg>
              </div>
              <div>
                <p className="lable">Amount (£)</p>
                <p className="val">
                  £ {disputeMessages.amount && disputeMessages.amount}
                </p>
              </div>
            </div>

            <div className="d-label">
              <div>
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    width="36"
                    height="36"
                    rx="8"
                    fill="#F5A2BF"
                    fill-opacity="0.4"
                  />
                  <mask id="path-2-inside-1" fill="white">
                    <path d="M28.125 17.4375C28.125 19.5513 27.4982 21.6176 26.3238 23.3752C25.1495 25.1327 23.4803 26.5026 21.5274 27.3115C19.5745 28.1204 17.4256 28.332 15.3525 27.9196C13.2793 27.5073 11.375 26.4894 9.8803 24.9947C8.38562 23.5 7.36774 21.5957 6.95536 19.5225C6.54298 17.4494 6.75463 15.3005 7.56354 13.3476C8.37245 11.3947 9.74229 9.72553 11.4998 8.55117C13.2574 7.37681 15.3237 6.75 17.4375 6.75L17.4375 17.4375H28.125Z" />
                  </mask>
                  <path
                    d="M28.125 17.4375C28.125 19.5513 27.4982 21.6176 26.3238 23.3752C25.1495 25.1327 23.4803 26.5026 21.5274 27.3115C19.5745 28.1204 17.4256 28.332 15.3525 27.9196C13.2793 27.5073 11.375 26.4894 9.8803 24.9947C8.38562 23.5 7.36774 21.5957 6.95536 19.5225C6.54298 17.4494 6.75463 15.3005 7.56354 13.3476C8.37245 11.3947 9.74229 9.72553 11.4998 8.55117C13.2574 7.37681 15.3237 6.75 17.4375 6.75L17.4375 17.4375H28.125Z"
                    stroke="#9E579D"
                    stroke-opacity="0.7"
                    stroke-width="2"
                    mask="url(#path-2-inside-1)"
                  />
                  <mask id="path-3-inside-2" fill="white">
                    <path d="M20.0148 4.66487C21.4182 4.68644 22.8035 4.98422 24.0918 5.54118C25.38 6.09815 26.546 6.90341 27.523 7.91097C28.5001 8.91854 29.2691 10.1087 29.7862 11.4135C30.3033 12.7182 30.5583 14.1121 30.5368 15.5154L19.8505 15.3511L20.0148 4.66487Z" />
                  </mask>
                  <path
                    d="M20.0148 4.66487C21.4182 4.68644 22.8035 4.98422 24.0918 5.54118C25.38 6.09815 26.546 6.90341 27.523 7.91097C28.5001 8.91854 29.2691 10.1087 29.7862 11.4135C30.3033 12.7182 30.5583 14.1121 30.5368 15.5154L19.8505 15.3511L20.0148 4.66487Z"
                    fill="#9E579D"
                    fill-opacity="0.7"
                    stroke="#9E579D"
                    stroke-opacity="0.7"
                    mask="url(#path-3-inside-2)"
                  />
                </svg>
              </div>
              <div>
                <p className="lable">Cashback (£)</p>
                <p className="val">
                  £ {disputeMessages.cashback && disputeMessages.cashback}
                </p>
              </div>
            </div>
          </div>
          <Form
            formData={disputeDetails}
            colCount={1}
            disabled={isDisputeMessageLoading}
          >
            <Item />
            {""}
            <Item
              dataField={"type"}
              editorType={"dxSelectBox"}
              editorOptions={{ typeEditorOptions, items: disputeType }}
            >
              <Label text={"Reason"} />
            </Item>
            <Item />
            <Item />
            <Item
              disabled={true}
              dataField={"status"}
              editorType={"dxSelectBox"}
              editorOptions={{ typeEditorOptions, items: statusDetails }}
            />
          </Form>
        </div>
        <div className="dispute-comments">
          <p className={"header"}>Comments</p>
          <div className={"body"}>
            <DataGrid
              dataSource={disputeMessages.dispute}
              rowRender={renderGridCell}
              disabled={isDisputeMessageLoading}
            >
              <Paging enabled={false} />
              <Column caption={""} />
            </DataGrid>
          </div>
          <Form
            formData={formData.current}
            colCount={2}
            disabled={isDisputeMessageLoading}
          >
            <Item
              dataField={"comment"}
              editorType={"dxTextArea"}
              editorOptions={nameEditorOptions}
            >
              <Label text="Comment:" />
              <RequiredRule message="Comment is required" />
            </Item>
            <GroupItem colCount={2}>
              <ButtonItem>
                <ButtonOptions
                  type={"disputeBtn"}
                  onClick={() => onUpdateDispute(disputeDetails)}
                  useSubmitBehavior={true}
                  width="100%"
                >
                  <span className="dx-button-text">
                    {isDisputeMessageLoading ? (
                      <LoadIndicator
                        width={"24px"}
                        height={"24px"}
                        visible={true}
                      />
                    ) : (
                      "Submit"
                    )}
                  </span>
                </ButtonOptions>
              </ButtonItem>
              <ButtonItem>
                <ButtonOptions
                  type={"disputeReset"}
                  text={"Cancel"}
                  width={"100%"}
                  onClick={onCancel}
                />
              </ButtonItem>
            </GroupItem>
          </Form>
        </div>
      </div>
    </React.Fragment>
  );
}

InfoTab.propTypes = {
  data: PropTypes.object,
  setDisputeMessage: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  visible: PropTypes.bool,
  isDisputeMessageLoading: PropTypes.bool
};

const mapDispatchToProps = {
  setDisputeMessage: MerchantDashboard.actions.setDisputeMessage
};

const mapStateToProps = state => ({
  isDisputeMessageLoading: MerchantDashboard.selectors.isDisputeMessageLoading(
    state
  )
});

const connected = connect(
  mapStateToProps,
  mapDispatchToProps
);

const typeEditorOptions = { placeholder: "Eligible" };

export default connected(InfoTab);
