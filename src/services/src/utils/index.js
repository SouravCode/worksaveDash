import JwtDecode from "jwt-decode";

function getUserInfo(token) {
  if (typeof token !== "string" || !token) {
    return "";
  }

  const userinfo = JwtDecode(token);
  return userinfo;
}

export { getUserInfo };
