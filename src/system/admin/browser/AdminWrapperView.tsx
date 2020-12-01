import React, { createElement, Fragment } from "react";
import { Emittable } from "../../../react/reactor/Reactor";
import { useEmitted } from "../../../react/reactor/useEmitted";
import { useEmitter } from "../../../react/reactor/useEmitter";
import { useLoader } from "../../../react/useLoader";
import { EmptyFragment } from "../../../react/utils/EmptyFragment";
import { ReactRouterWrapper } from "../../../typerouter/ReactRouterView";
import { AdminInfoConnection, AdminInfoData } from "../common";

/*

ReactorEvent<>
 */
export const AdminInfoEvent = Emittable<
  | AdminInfoData
  | {
      type: "pending";
    }
>({ type: "pending" });

export const AdminWrapperView: ReactRouterWrapper = ({ children }) => {
  const emit = useEmitter();
  const adminInfo = useEmitted(AdminInfoEvent);

  //

  useLoader(async () => {
    console.log("Admin init");
    emit(AdminInfoEvent, await AdminInfoConnection());
  });

  switch (adminInfo?.type) {
    case "fail":
      return EmptyFragment;

    case "success":
      return createElement(Fragment, null, children);
  }

  return EmptyFragment;
};

//
