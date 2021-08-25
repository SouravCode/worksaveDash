import React from "react";
import { Form, Item } from "devextreme-react/form";
function InfoTab(data) {
  const items = ["name", "emailId", "mobileNumber"];
  let infoDetails = data.data;
  return (
    <Form
      formData={infoDetails}
      colCount={2}
      className="address-form form-container"
    >
      {items.map((item, index) => (
        <Item dataField={item} key={index} render={renderFormItem} />
      ))}
    </Form>
  );
}
const renderFormItem = item => {
  return <span>{item.editorOptions.value}</span>;
};
export default InfoTab;
