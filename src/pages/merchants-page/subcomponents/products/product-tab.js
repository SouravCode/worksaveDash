import React, { useState } from "react";
import { ProductForm, ProductList } from "./subcomponents";
import { Button } from "devextreme-react/button";
import { cloneDeep } from "lodash";
function ProductsTab(props) {
  const [isAddNewMode, setIsAddNewMode] = useState(false);
  let data = cloneDeep(props.data);
  return (
    <React.Fragment>
      <h2 className={"content-block"}>
        {" "}
        Products{" "}
        <Button
          icon="plus"
          text="Add New"
          type="primary"
          stylingMode="outlined"
          onClick={() => setIsAddNewMode(true)}
        />
      </h2>
      <ProductForm
        data={data}
        isHidden={!isAddNewMode}
        onCancel={() => setIsAddNewMode(false)}
      />
      <ProductList data={data} />
    </React.Fragment>
  );
}
export default ProductsTab;
