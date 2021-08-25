import "devextreme/dist/css/dx.common.css";
import "./themes/generated/theme.base.css";
import "./themes/generated/theme.additional.css";

import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux-ws";
import "./dx-styles.scss";
import LoadPanel from "devextreme-react/load-panel";
import { NavigationProvider } from "./contexts/navigation";

import { useScreenSizeClass } from "./utils/media-query";
import MainContent from "./main-content";

import NotAuthenticatedContent from "./NotAuthenticatedContent";
import Content from "./Content";
import { fire } from "./services/src/auth-service/firebase";
const uri = `${window.location.origin}/implicit/callback`;
// import makeFakeServer from "./fake-api/server";

// makeFakeServer();

function App() {

  const [userInfo, setUserInfo] = useState(null);
  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        setUserInfo(fire.auth().currentUser);
        return <MainContent />;
      }
      else
        return <NotAuthenticatedContent />;
    });
  }
  useEffect(() => {
    authListener();
  }, []);


  return fire.auth().currentUser ? <MainContent /> : <NotAuthenticatedContent />;

}

// const AppWithServices = withServices(App);

export default function () {
  const screenSizeClass = useScreenSizeClass();
  return (
    <Provider store={store}>

      <Router>
        <NavigationProvider>
          <div className={`app ${screenSizeClass}`}>
            <App />
          </div>
        </NavigationProvider>
      </Router>

    </Provider>
  );
}
