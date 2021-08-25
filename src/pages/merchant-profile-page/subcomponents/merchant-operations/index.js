import React from "react";
import List from "devextreme-react/list";
import Form, { Item } from "devextreme-react/form";
import { ImageURI } from "../../../../app-config";
function MerchantOperation() {
  let merchantCardDetials = [];
  let merchantWorkingDetails = [];
  let merchantCuisines = [];
  const merchantDetails = localStorage.getItem("merchant")
    ? JSON.parse(localStorage.getItem("merchant"))
    : "";
  if (
    merchantDetails &&
    merchantDetails.locations &&
    merchantDetails.locations.length > 0
  ) {
    merchantCardDetials = merchantDetails.locations[0].cardSchemes;
    merchantWorkingDetails = merchantDetails.locations[0].workingTimings;
    merchantCuisines = merchantDetails.locations[0].cuisines;
  }

  const renderCuisineCell = data => {
    return (
      <body>
        <br />
        <div className="product">
          <p className={"name"}>
            {data.name}
            <p>Priority: {data.priority}</p>
          </p>
        </div>

        <br />
      </body>
    );
  };
  return (
    <React.Fragment>
      <div className="operational-container">
        <div className="profile-flex spaceBetween">
          <p>
            <span>Category:</span>
            <span className="value">{merchantDetails.category}</span>
          </p>
          <p>
            <span>Sub-Category:</span>
            <span className="value">{"-"}</span>
          </p>
        </div>
        <p>
          <span>Speciality :</span>
          <span className="value">{"-"}</span>
        </p>
        <div className="profile-container">
          <div className="container">
            <div className="profile-flex spaceBetween" />
          </div>
        </div>
        <br />
        <div className={"merchantDetails"}>
          <h6 className={"mb-0"}>Cuisine Type (s)</h6>
        </div>

        <Form>
          <Item>
            <List
              dataSource={merchantCuisines}
              height="100%"
              itemRender={renderCuisineCell}
            />
          </Item>
        </Form>
      </div>
      <br />
      <div className="operational-container">
        <div className={"merchantDetails"}>
          <h6 className={"mb-0"}>CREDIT CARD(S) ACCEPTED:</h6>
        </div>
        <div className="profile-flex spaceBetween cards">
          <p>
            <span>Visa:</span>{" "}
            <span className="value">
              {" "}
              {merchantCardDetials.length > 0 &&
                merchantCardDetials[0].isValid == true
                ? "Yes"
                : "No"}
            </span>
          </p>
          <p>
            <span>MasterCard:</span>{" "}
            <span className="value">
              {merchantCardDetials.length > 0 &&
                merchantCardDetials[1].isValid == true
                ? "Yes"
                : "No"}
            </span>
          </p>
          <p>
            <span>Amex :</span>{" "}
            <span className="value">
              {merchantCardDetials.length > 0 &&
                merchantCardDetials[2].isValid == true
                ? "Yes"
                : "No"}
            </span>
          </p>
        </div>
      </div>
      <br />
      <div className="operational-container">
        <div className={"merchantDetails"}>
          <h6 className={"mb-0"}>OPERATING HOURS:</h6>
        </div>
        <p>
          Sunday:{" "}
          <span className="value">
            {merchantWorkingDetails.length > 0 &&
              merchantWorkingDetails[0].weekDay == "1"
              ? merchantWorkingDetails[0].openingTimings
              : "-"}{" "}
            to{" "}
            {merchantWorkingDetails.length > 0 &&
              merchantWorkingDetails[0].weekDay == "1"
              ? merchantWorkingDetails[0].closingTimings
              : "-"}
          </span>
          {"  "}
          <span>Shop:</span>{" "}
          <span className="value">
            {" "}
            {merchantWorkingDetails.length > 0 &&
              merchantWorkingDetails[0].isOpen == true
              ? "Open"
              : "Closed"}
          </span>
        </p>
        <p>
          Monday:{" "}
          <span className="value">
            {merchantWorkingDetails.length > 0 &&
              merchantWorkingDetails[1].weekDay == "2"
              ? merchantWorkingDetails[1].openingTimings
              : "-"}{" "}
            to{" "}
            {merchantWorkingDetails.length > 0 &&
              merchantWorkingDetails[1].weekDay == "2"
              ? merchantWorkingDetails[1].closingTimings
              : "-"}
          </span>
          {"  "}
          <span>Shop:</span>{" "}
          <span className="value">
            {" "}
            {merchantWorkingDetails.length > 0 &&
              merchantWorkingDetails[1].isOpen == true
              ? "Open"
              : "Closed"}
          </span>
        </p>
        <p>
          Tuesday:{" "}
          <span className="value">
            {merchantWorkingDetails.length > 0 &&
              merchantWorkingDetails[2].weekDay == "3"
              ? merchantWorkingDetails[2].openingTimings
              : "-"}{" "}
            to{" "}
            {merchantWorkingDetails.length > 0 &&
              merchantWorkingDetails[2].weekDay == "3"
              ? merchantWorkingDetails[2].closingTimings
              : "-"}
          </span>
          {"  "}
          <span>Shop:</span>{" "}
          <span className="value">
            {" "}
            {merchantWorkingDetails.length > 0 &&
              merchantWorkingDetails[2].isOpen == true
              ? "Open"
              : "Closed"}
          </span>
        </p>
        <p>
          Wednesday:
          <span className="value">
            {merchantWorkingDetails.length > 0 &&
              merchantWorkingDetails[3].weekDay == "4"
              ? merchantWorkingDetails[3].openingTimings
              : "-"}{" "}
            to{" "}
            {merchantWorkingDetails.length > 0 &&
              merchantWorkingDetails[3].weekDay == "4"
              ? merchantWorkingDetails[3].closingTimings
              : "-"}
          </span>
          {"  "}
          <span>Shop:</span>{" "}
          <span className="value">
            {" "}
            {merchantWorkingDetails.length > 0 &&
              merchantWorkingDetails[3].isOpen == true
              ? "Open"
              : "Closed"}
          </span>
        </p>
        <p>
          Thursday:
          <span className="value">
            {merchantWorkingDetails.length > 0 &&
              merchantWorkingDetails[4].weekDay == "5"
              ? merchantWorkingDetails[4].openingTimings
              : "-"}{" "}
            to{" "}
            {merchantWorkingDetails.length > 0 &&
              merchantWorkingDetails[4].weekDay == "5"
              ? merchantWorkingDetails[4].closingTimings
              : "-"}
          </span>
          {"  "}
          <span>Shop:</span>{" "}
          <span className="value">
            {" "}
            {merchantWorkingDetails.length > 0 &&
              merchantWorkingDetails[4].isOpen == true
              ? "Open"
              : "Closed"}
          </span>
        </p>
        <p>
          Friday:
          <span className="value">
            {merchantWorkingDetails.length > 0 &&
              merchantWorkingDetails[5].weekDay == "6"
              ? merchantWorkingDetails[5].openingTimings
              : "-"}{" "}
            to{" "}
            {merchantWorkingDetails.length > 0 &&
              merchantWorkingDetails[5].weekDay == "6"
              ? merchantWorkingDetails[5].closingTimings
              : "-"}
          </span>
          {"  "}
          <span>Shop:</span>{" "}
          <span className="value">
            {" "}
            {merchantWorkingDetails.length > 0 &&
              merchantWorkingDetails[5].isOpen == true
              ? "Open"
              : "Closed"}
          </span>
        </p>
        <p>
          Saturday:
          <span className="value">
            {merchantWorkingDetails.length > 0 &&
              merchantWorkingDetails[6].weekDay == "7"
              ? merchantWorkingDetails[6].openingTimings
              : "-"}{" "}
            to{" "}
            {merchantWorkingDetails.length > 0 &&
              merchantWorkingDetails[6].weekDay == "7"
              ? merchantWorkingDetails[6].closingTimings
              : "-"}
          </span>
          {"  "}
          <span>Shop:</span>{" "}
          <span className="value">
            {" "}
            {merchantWorkingDetails.length > 0 &&
              merchantWorkingDetails[6].isOpen == true
              ? "Open"
              : "Closed"}
          </span>
        </p>
      </div>
    </React.Fragment>
  );
}

export default MerchantOperation;
