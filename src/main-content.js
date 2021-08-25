import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import Content from "./Content";
import { fire, isAuthorized, getAccessToken } from "./services/src/auth-service/firebase";
import MerchantContent from "./Content-merchant";
import NotAuthenticatedContent from "./NotAuthenticatedContent";
import { getMerchantDetail } from "./services/src/api/models/client";
import { getUserInfo } from "./services/src/utils";
const MainPage = () => {
  const authState = isAuthorized();
  const history = useHistory();
  const [userInfo, setUserInfo] = useState(null);
  const merchantDetails = localStorage.getItem("merchant")
    ? JSON.parse(localStorage.getItem("merchant"))
    : "";
  useEffect(() => {
    if (!authState) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      getAccessToken().then(token => {

        getMerchantDetail(token).then(e => {
          const info = getUserInfo(token);
          console.log('USer info', info);
          setUserInfo(info);
        });
      });


    }
  }, [authState]); // Update if authState changes

  if (userInfo && userInfo.wove_admin_access) {
    console.log(userInfo);
    return <Content />;
  } else if (
    userInfo &&
    userInfo.wove_merchant_access &&
    !merchantDetails.isPasswordChange
  ) {
    return <MerchantContent />;
  } else if (
    userInfo &&
    userInfo.wove_merchant_access &&
    merchantDetails.isPasswordChange
  ) {
    history.push("/change-password/:recoveryCode");
  }
  return <NotAuthenticatedContent />;
};

export default MainPage;
