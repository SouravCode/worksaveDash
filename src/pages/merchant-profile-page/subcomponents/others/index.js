import React from "react";
import List from "devextreme-react/list";
import Form, { Item } from "devextreme-react/form";
import { ImageURI } from "../../../../app-config";
function MerchantOthers() {
  let merchantProducts = [];
  const merchantDetails = localStorage.getItem("merchant")
    ? JSON.parse(localStorage.getItem("merchant"))
    : "";

  if (
    merchantDetails &&
    merchantDetails.locations &&
    merchantDetails.locations.length > 0 &&
    merchantDetails.locations[0].products &&
    merchantDetails.locations[0].products.length > 0
  ) {
    merchantProducts = merchantDetails.locations[0].products;
  }
  const renderProductCell = data => {
    return (
      <React.Fragment>
        <List
          dataSource={data.imageUrls}
          height="100%"
          itemRender={renderProductImgCell}
        />
        <p className="value">
          {data.name} <p className="value">Price: £ {data.price}</p>
        </p>
      </React.Fragment>
    );
  };

  const renderProductImgCell = data => {
    return (
      <body>
        <br />
        <div className="product">
          <img src={`${ImageURI}${data && data.url ? data.url : ""}`} />
        </div>

        <br />
      </body>
    );
  };
  const renderImageCell = data => {
    return (
      <body>
        <br />
        <div className="product">
          <img src={`${ImageURI}${data && data.url ? data.url : ""}`} />
        </div>

        <br />
      </body>
    );
  };
  return (
    <React.Fragment>
      <div className={"merchantDetails"}>
        <h3 className={"title"}>Logo</h3>
      </div>
      <div className="product">
        <img
          src={`${ImageURI}${
            merchantDetails && merchantDetails.logoUrl
              ? merchantDetails.logoUrl
              : "-"
          }`}
        />
      </div>
      <div className={"merchantDetails"}>
        <h3 className={"title"}>Merchant Images</h3>
      </div>
      <Form>
        <Item>
          <List
            dataSource={merchantDetails.imageUrls}
            height="100%"
            itemRender={renderImageCell}
          />
        </Item>
      </Form>
      <div className={"merchantDetails"}>
        <h3 className={"title"}>Products</h3>
      </div>
      <Form>
        <Item>
          <List
            dataSource={merchantProducts}
            height="100%"
            itemRender={renderProductCell}
          />
        </Item>
      </Form>
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

export default MerchantOthers;
