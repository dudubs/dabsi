import React, { ReactElement } from "react";
import {
  MuiNestedMenu,
  MuiNestedMenuProps,
} from "../../../browser/mui/MuiNestedMenu";
import { mapObject } from "../../../common/object/mapObject";
import { useEmitter } from "../../../react/reactor/useEmitter";
import { useRoute } from "../../../typerouter/ReactRouter";
import { MuiAdminMenu, MuiAdminMenuProps } from "./MuiAdminMenu";

export function MuiAdminMenuView(): ReactElement {
  const route = useRoute();
  return (
    <MuiNestedMenu
      children={mapObject(MuiAdminMenu.children, getNestedMenuProps)}
    />
  );

  function getNestedMenuProps(
    props: MuiAdminMenuProps,
    key: string
  ): MuiNestedMenuProps {
    return {
      icon: props.icon,
      title: props.title,
      onClick() {
        props.router && route.location.find(props.router)!.push();
      },
      children: props.children && mapObject(props.children, getNestedMenuProps),
    };
  }
}
