import { fire } from "./firebase"
import { OktaAuth } from "@okta/okta-auth-js";
import { OktaIssuer } from "../../../app-config";

const oktaAuth = new OktaAuth({
  issuer: OktaIssuer
});

export async function loginOkta({ username, password }) {
  try {
    const success = await oktaAuth.signIn({ username, password });
    if (success.status === "SUCCESS") {
      return success;
    }
    return {
      errors: ["Please try again later."]
    };
  } catch (err) {
    console.warn("login error", err);

    return {
      errors: ["Please try again later."]
    };
  }
}

export async function loginFirebase({ username, password }) {
  try {
    const success = await fire.auth().signInWithEmailAndPassword(username, password);
    return { status: 'SUCCESS' };
  } catch (err) {
    console.warn("login error", err);

    return {
      errors: ["Please try again later."]
    };
  }
}
