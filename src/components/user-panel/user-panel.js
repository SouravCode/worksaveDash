import React, { useMemo } from "react";

import ContextMenu, { Position } from "devextreme-react/context-menu";
import { fire } from "../../services/src/auth-service/firebase";
import List from "devextreme-react/list";
import { useAuth } from "../../contexts/auth";
import "./user-panel.scss";

export default function ({ menuMode }) {
  const { user } = useAuth();
  const logOut = async e => {
    localStorage.setItem("merchant", "");
   
    await fire.auth().signOut();
    window.location.reload(false);
  };
  const menuItems = useMemo(
    () => [
      {
        text: "Logout",
        icon: "runner",
        onClick: logOut
      }
    ],
    []
  );

  return (
    <List items={menuItems} />
    // <div className={"user-panel"}>
    //   <div className={"user-info"}>
    //     <div className={"image-container"}>
    //       <div
    //         style={{
    //           background: `url(${user}) no-repeat #fff`,
    //           backgroundSize: "cover"
    //         }}
    //         className={"user-image"}
    //       />
    //     </div>
    //     <div className={"user-name"}>{user}</div>
    //   </div>

    //   {menuMode === "context" && (
    //     <ContextMenu
    //       items={menuItems}
    //       target={".user-button"}
    //       showEvent={"dxclick"}
    //       width={210}
    //       cssClass={"user-menu"}
    //     >
    //       <Position my={"top center"} at={"bottom center"} />
    //     </ContextMenu>
    //   )}
    //   {menuMode === "list" && (
    //     <List className={"dx-toolbar-menu-action"} items={menuItems} />
    //   )}
    // </div>
  );
}
