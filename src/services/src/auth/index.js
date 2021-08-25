import { HttpClient } from "../../";

export async function login({ email, password }) {
  try {
    const response = await HttpClient.fetch("/login", {
      body: JSON.stringify({
        grant_type: "password",
        password,
        email
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST"
    });

    if (response === null) {
      return false;
    }

    const result = await response.json();

    if (response.status === 201) {
      return result;
    }

    if (result && result.errors && result.errors.length) {
      return {
        errors: result.errors
      };
    }

    return {
      errors: ["Oh oh! Our system just snapped. Please try again later."]
    };
  } catch (err) {
    console.warn("login error", err);

    return {
      errors: ["Oh oh! Our system just snapped. Please try again later."]
    };
  }
}
