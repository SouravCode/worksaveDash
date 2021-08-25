import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { SingleCard } from "./layouts";
import logo from "./assets/applogo.png";

import {
  LoginForm,
  ResetPasswordForm,
  ChangePasswordForm,
  CreateAccountForm
} from "./components";

export default function () {
  return (
    <Switch>
      <Route exact path="/login">
        <SingleCard title="Lets sign you in" class>
          <div className={"logoContainer"}>
            <img src={logo} className={"logo"} />
          </div>

          <LoginForm />
        </SingleCard>
      </Route>
      <Route exact path="/create-account">
        <SingleCard title="Sign Up">
          <CreateAccountForm />
        </SingleCard>
      </Route>
      <Route exact path="/reset-password">
        <SingleCard
          title="Reset Password"
          description="Please enter the email address that you used to register, and we will send you an email with a link to reset your password."
        >
          <ResetPasswordForm />
        </SingleCard>
      </Route>
      <Route exact path="/change-password/:recoveryCode">
        <SingleCard title="Change Password">
          <ChangePasswordForm />
        </SingleCard>
      </Route>
      <Redirect to={"/login"} />
    </Switch>
  );
}
