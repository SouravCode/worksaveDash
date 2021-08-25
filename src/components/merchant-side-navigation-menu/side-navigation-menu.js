import React, { useEffect, useRef, useCallback, useMemo } from "react";
import TreeView from "devextreme-react/tree-view";
import { DateTime } from "luxon";

import { navigation } from "../../merchant-app-navigation";
import { useNavigation } from "../../contexts/navigation";
import { useScreenSize } from "../../utils/media-query";
import "./side-navigation-menu.scss";

import * as events from "devextreme/events";

export default function(props) {
  const {
    children,
    selectedItemChanged,
    openMenu,
    compactMode,
    onMenuReady
  } = props;

  const merchantDetails = localStorage.getItem("merchant")
    ? JSON.parse(localStorage.getItem("merchant"))
    : "";

  const { isLarge } = useScreenSize();
  const items = useMemo(
    () => navigation.map(item => ({ ...item, expanded: isLarge })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const {
    navigationData: { currentPath }
  } = useNavigation();

  const treeViewRef = useRef();
  const wrapperRef = useRef();
  const getWrapperRef = useCallback(
    element => {
      const prevElement = wrapperRef.current;
      if (prevElement) {
        events.off(prevElement, "dxclick");
      }

      wrapperRef.current = element;
      events.on(element, "dxclick", e => {
        openMenu(e);
      });
    },
    [openMenu]
  );

  useEffect(() => {
    const treeView = treeViewRef.current && treeViewRef.current.instance;
    if (!treeView) {
      return;
    }

    if (currentPath !== undefined) {
      treeView.selectItem(currentPath);
      treeView.expandItem(currentPath);
    }

    if (compactMode) {
      treeView.collapseAll();
    }
  }, [currentPath, compactMode]);

  return (
    <div
      className={"dx-swatch-additional side-navigation-menu"}
      ref={getWrapperRef}
    >
      {children}
      <div className={"brandSection"}>
        <img src="" alt="" className={"image"} />
        <p className={"name"}>{merchantDetails ? merchantDetails.name : ""}</p>
        <p className={"address"}>
          {merchantDetails &&
          merchantDetails.locations &&
          merchantDetails.locations.length > 0
            ? merchantDetails.locations[0].line1
            : ""}
          ,
          {merchantDetails &&
          merchantDetails.locations &&
          merchantDetails.locations.length > 0
            ? merchantDetails.locations[0].line2
            : ""}
          ,{" "}
          {merchantDetails &&
          merchantDetails.locations &&
          merchantDetails.locations.length > 0
            ? merchantDetails.locations[0].zip
            : ""}
          ,{" "}
          {merchantDetails &&
          merchantDetails.locations &&
          merchantDetails.locations.length > 0
            ? merchantDetails.locations[0].state
            : ""}
        </p>
        <p className={"merchant"}>
          Merchant ID : {merchantDetails ? merchantDetails.merchantId : ""}
        </p>
        <p className={"duration"}>
          Member since :{" "}
          {merchantDetails
            ? DateTime.fromISO(merchantDetails.createdDate).toFormat(
                "dd LLL, yy HH:mm"
              )
            : ""}
        </p>
      </div>
      <div className={"menu-container"}>
        <TreeView
          ref={treeViewRef}
          items={items}
          keyExpr={"path"}
          selectionMode={"single"}
          focusStateEnabled={false}
          expandEvent={"click"}
          onItemClick={selectedItemChanged}
          onContentReady={onMenuReady}
          width={"100%"}
        />
      </div>
    </div>
  );
}
