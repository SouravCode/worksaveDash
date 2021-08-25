import React from "react";
function MerchantTechnology() {
  const merchantDetails = localStorage.getItem("merchant")
    ? JSON.parse(localStorage.getItem("merchant"))
    : "";

  return (
    <React.Fragment>
      <div className="technology-container">
        <div className="profile-flex spaceBetween">
          <p className="technology">Wifi (Y/N):</p>
          <p className="details">Details:</p>
        </div>
        <div className="profile-flex spaceBetween">
          <p className="technology">Laptop (Y/N): </p>
          <p className="details">Details:</p>
        </div>
        <div className="profile-flex spaceBetween">
          <p className="technology">Tab (Y/N): </p>
          <p className="details">Details:</p>
        </div>
        <div className="profile-flex spaceBetween">
          <p className="technology">Smartphone (Y/N): </p>
          <p className="details">Details:</p>
        </div>
      </div>
      <div className="technology-container">
        <div className="profile-flex spaceBetween">
          <p className="technology">PoS:</p>
          <p className="details">Details:</p>
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

export default MerchantTechnology;
