import React, { useState, useRef, useCallback } from "react";
import { Link, useHistory, Redirect } from "react-router-dom";
import Form, {
  Item,
  Label,
  ButtonItem,
  GroupItem,
  ButtonOptions,
  RequiredRule,
  EmailRule
} from "devextreme-react/form";
import { fire } from "../../services/src/auth-service/firebase";
import LoadIndicator from "devextreme-react/load-indicator";
import { AuthService } from "../../services";
import { } from "../../contexts/auth";
import notify from "devextreme/ui/notify";
import "./login-form.scss";

export default function (props) {
  const [sessionToken, setSessionToken] = useState();
  const [password, setPassword] = useState("password");
  const [icon, setIcon] = useState("spinup");
  const history = useHistory();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const formData = useRef({});
  const notificationText = "Invalid Email and password! Try Again";

  const passwordEditorOptions = {
    stylingMode: "filled",
    placeholder: "Enter Your Password",
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
              passwordEditorOptions.mode == "text" ? "password" : "text"
            );
            setIcon(
              passwordEditorOptions.buttons[0].options.icon == "spinup"
                ? "spindown"
                : "spinup"
            );
          }
        }
      }
    ]
  };


  const onSubmit = async e => {
    e.preventDefault();
    const { email: username, password } = formData.current;
    setLoading(true);

    const result = await AuthService.loginFirebase({ username, password });

    if (result.status === "SUCCESS") {
      const sessionToken = await fire.auth().currentUser.getIdToken();
      setSessionToken(sessionToken);
    } else {
      setLoading(false);
      console.warn("login failed");
    }
  };


  const onCreateAccountClick = useCallback(() => {
    history.push("/create-account");
  }, [history]);

  return (
    <form className={"login-form"} onSubmit={onSubmit}>
      <Form formData={formData.current} disabled={loading}>
        <Item
          dataField={"email"}
          editorType={"dxTextBox"}
          editorOptions={emailEditorOptions}
        >
          <RequiredRule message="Email is required" />
          {/* <EmailRule message="Email is invalid" /> */}
          <Label visible={true} text={"Email:"} />
        </Item>
        <Item
          dataField={"password"}
          editorType={"dxTextBox"}
          editorOptions={passwordEditorOptions}
        >
          <RequiredRule message="Password is required" />
          <Label visible={true} text={"Password:"} />
        </Item>
        {/* <GroupItem colCount={2}>
          <Item />
          <Item>
            <div>
              <Link to={"/change-password/:recoveryCode"}>Reset password?</Link>
            </div>
          </Item>
        </GroupItem> */}
        {/* <Item
          dataField={"rememberMe"}
          editorType={"dxCheckBox"}
          editorOptions={rememberMeEditorOptions}
        >
          <Label visible={false} />
        </Item> */}

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
                "Sign In"
              )}
            </span>
          </ButtonOptions>
        </ButtonItem>
        <Item>
          <div className={"link"}>
            <Link to={"/reset-password"}>Forgot password?</Link>
          </div>
        </Item>
        {/* <ButtonItem>
          <ButtonOptions
            text={"Create an account"}
            width={"100%"}
            onClick={onCreateAccountClick}
          />
        </ButtonItem> */}
      </Form>
    </form>
  );
}

const emailEditorOptions = {
  stylingMode: "filled",
  placeholder: "Enter your email",
  mode: "email"
};

const rememberMeEditorOptions = {
  text: "Remember me",
  elementAttr: { class: "form-text" }
};
