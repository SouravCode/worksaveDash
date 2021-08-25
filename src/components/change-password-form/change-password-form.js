import React, { useState, useRef, useCallback } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import Form, {
  Item,
  Label,
  ButtonItem,
  ButtonOptions,
  RequiredRule,
  CustomRule,
  PatternRule
} from "devextreme-react/form";
import LoadIndicator from "devextreme-react/load-indicator";
import { resetPassword } from "../../../src/services/src/api/models/client";
import notify from "devextreme/ui/notify";
import { getAccessToken, fire } from "../../services/src/auth-service/firebase";
export default function (props) {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("password");
  const [icon, setIcon] = useState("spinup");
  const formData = useRef({});
  const { recoveryCode } = useParams();
  const notificationText = "Invalid password! Try Again";
  const notificationTextSuccess = "Password Successfully Changed";

  const passwordsEditorOptions = {
    stylingMode: "filled",
    placeholder: "Old Password",
    mode: password,
    buttons: [
      {
        name: "show",
        location: "after",
        options: {
          stylingMode: "text",
          icon: icon,
          onClick: () => {
            setPassword(
              passwordsEditorOptions.mode == "text" ? "password" : "text"
            );
            setIcon(
              passwordsEditorOptions.buttons[0].options.icon == "spinup"
                ? "spindown"
                : "spinup"
            );
          }
        }
      }
    ]
  };

  const confirmedPasswordEditorOptions = {
    stylingMode: "filled",
    placeholder: "Confirm Password",
    mode: password
  };

  const passwordEditorOptions = {
    stylingMode: "filled",
    placeholder: "New Password",
    mode: password
  };

  const logOut = async e => {
    localStorage.setItem("merchant", "");
    history.push("/login");
    await fire.auth().signOut();
  };
  const onSubmit = async e => {
    setLoading(true);
    e.preventDefault();
    const { newPassword, oldPassword } = formData.current;
    const token = await getAccessToken();
    const apiResponce = await resetPassword(
      formData.current,
      token
    );
    if (apiResponce) {
      setLoading(false);
      logOut();
      history.push("/login");
      notify(notificationTextSuccess, "success", 2000);
    }
    if (!apiResponce) {
      setLoading(false);
      notify(notificationText, "error", 1800);
    }
  };

  const confirmPassword = useCallback(
    ({ value }) => value === formData.current.newPassword,
    []
  );

  return (
    <form className="reset-password-form" onSubmit={onSubmit}>
      <Form formData={formData.current} disabled={loading}>
        <Item
          dataField={"oldPassword"}
          editorType={"dxTextBox"}
          editorOptions={passwordsEditorOptions}
        >
          <RequiredRule message="Old Password is required" />
          <Label visible={false} />
        </Item>
        <Item
          dataField={"newPassword"}
          editorType={"dxTextBox"}
          editorOptions={passwordEditorOptions}
        >
          <PatternRule
            message="* Password Must include atleast 1 numeral, 1 capital letter and 1 special character like !, @, #, $, %, ^, &, *"
            pattern={
              /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])([a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\_\+\.\,\;\:]{6,})$/
            }
          />
          <RequiredRule message="Password is required" />
          <Label visible={false} />
        </Item>
        <Item />
        <Item
          dataField={"confirmedPassword"}
          editorType={"dxTextBox"}
          editorOptions={confirmedPasswordEditorOptions}
        >
          <RequiredRule message="Password is required" />
          <CustomRule
            message={"Passwords do not match"}
            validationCallback={confirmPassword}
          />
          <Label visible={false} />
        </Item>
        <ButtonItem>
          <ButtonOptions
            width={"100%"}
            type={"default"}
            useSubmitBehavior={true}
          >
            <span className="dx-button-text">
              {loading ? (
                <LoadIndicator width={"24px"} height={"24px"} visible={true} />
              ) : (
                "Continue"
              )}
            </span>
          </ButtonOptions>
        </ButtonItem>
        <Item>
          <div className={"login-link"}>
            Return to <Link to={"/login"}>Sign In</Link>
          </div>
        </Item>
      </Form>
    </form>
  );
}
