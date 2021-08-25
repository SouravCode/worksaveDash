import React from "react";
import "./merchant-profile.scss";
function MerchantProfile() {
  let merchantContact = [];
  const merchantDetails = localStorage.getItem("merchant")
    ? JSON.parse(localStorage.getItem("merchant"))
    : "";
  console.log(merchantDetails);
  if (
    merchantDetails &&
    merchantDetails.locations &&
    merchantDetails.locations.length > 0
  ) {
    merchantContact = merchantDetails.locations[0].contact;
  }
  return (
    <React.Fragment>
      <div className="profile-container">
        <div className="profile-flex spaceBetween">
          <p>
            <span className="label">Name:</span>
            <span className="value">{merchantDetails.name}</span>
          </p>
          <p className="discription">
            <span>Description:</span>
            <span className="value">{merchantDetails.description}</span>
          </p>
        </div>
        <div className="profile-flex spaceBetween">
          <p>
            <span>First Name:</span>
            <span className="value">
              {merchantDetails.firstName ? merchantDetails.firstName : ""}
            </span>
          </p>
          <p>
            <span>Last Name:</span>
            <span className="value">
              {merchantDetails.lastName ? merchantDetails.lastName : ""}
            </span>
          </p>
        </div>
        <div className="profile-flex spaceBetween">
          <p>
            <span>Phone Number:</span>
            <span className="value">
              {merchantDetails.phoneNumber ? merchantDetails.phoneNumber : ""}
            </span>
          </p>
          <p>
            <span>Mobile Number:</span>
            <span className="value">
              {merchantDetails.mobileNumber ? merchantDetails.mobileNumber : ""}
            </span>
          </p>
        </div>
        <div className="profile-flex spaceBetween">
          <p>
            <span>MID :</span>
            <span className="value">{merchantDetails.merchantId}</span>
          </p>
          <p>
            <span>Address:</span>
            <span className="value">
              {merchantDetails.locations.length > 0 &&
              merchantDetails.locations[0].line1
                ? merchantDetails.locations[0].line1
                : "-"}
              ,
              {merchantDetails.locations.length > 0 &&
              merchantDetails.locations[0].line2
                ? merchantDetails.locations[0].line2
                : "-"}
              ,
              {merchantDetails.locations.length > 0 &&
              merchantDetails.locations[0].zip
                ? merchantDetails.locations[0].zip
                : "-"}
            </span>
          </p>
        </div>
        <div className="profile-flex spaceBetween">
          <p>
            <span>Latitude:</span>
            <span className="value">
              {merchantDetails.locations.length > 0 &&
              merchantDetails.locations[0].latitude
                ? merchantDetails.locations[0].latitude
                : "-"}
            </span>
          </p>
          <p>
            <span>Longitude: </span>
            <span className="value">
              {merchantDetails.locations.length > 0 &&
              merchantDetails.locations[0].longitude
                ? merchantDetails.locations[0].longitude
                : "-"}
            </span>
          </p>
        </div>
        <p> Contact Person: </p>
        <div className="profile-flex spaceBetween">
          <p>
            <span>Phone Nr (Primary): </span>
            <span className="value">
              {merchantContact &&
              merchantContact.length > 0 &&
              merchantContact[1].value
                ? merchantContact[1].value
                : "-"}
            </span>{" "}
          </p>
          <p>
            <span>Phone Nr (Secondary):</span>{" "}
            <span className="value">
              {merchantContact &&
              merchantContact.length > 0 &&
              merchantContact[3].value
                ? merchantContact[3].value
                : "-"}
            </span>{" "}
          </p>
        </div>
        <div className="profile-flex spaceBetween">
          <p>
            <span>Email ID (Primary):</span>{" "}
            <span className="value">
              {merchantContact &&
              merchantContact.length > 0 &&
              merchantContact[0].value
                ? merchantContact[0].value
                : "-"}
            </span>
          </p>
          <p>
            {" "}
            <span>Email ID (Secondary):</span>{" "}
            <span className="value">
              {merchantContact &&
              merchantContact.length > 0 &&
              merchantContact[2].value
                ? merchantContact[2].value
                : "-"}
            </span>
          </p>
        </div>
        <p>
          <span>Website:</span>
        </p>
      </div>
      <br />
      <div className="profile-container">
        <div className="container">
          <div className="profile-flex spaceBetween">
            <p>Registration Number: {"-"}</p>
            <p> VAT ID: {"-"} </p>
          </div>
          <div className="profile-flex spaceBetween">
            <p>Business Owner(s): {"-"}</p>
            <p> Ownership Type {"-"} </p>
          </div>
          <div className="profile-flex spaceBetween">
            <p>Signig Autority: {"-"}</p>
            <p>Designation/ Title:{"-"} </p>
          </div>
          <div className="profile-flex spaceBetween">
            <p>Contact Nr: {"-"}</p>
            <p> Email ID: {"-"} </p>
          </div>
        </div>
      </div>

      <div className="profile-container">
        <div className="container">
          <div className="profile-flex spaceBetween">
            <p> ADDITIONAL NOTES:{""}</p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default MerchantProfile;
