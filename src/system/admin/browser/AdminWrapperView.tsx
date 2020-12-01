import React, { createElement, Fragment } from "react";
import { useEmitted } from "../../../react/reactor/useEmitted";
import { useEmitter } from "../../../react/reactor/useEmitter";
import { useLoader } from "../../../react/useLoader";
import { ReactRouterWrapper } from "../../../typerouter/ReactRouterView";
import { AdminInfoConnection } from "../common";
import { AdminInfo } from "./AdminInfo";
import { AdminLoginView } from "./AdminLoginView";

export const AdminWrapperView: ReactRouterWrapper = ({ children }) => {
  const emit = useEmitter();
  const adminInfo = useEmitted(AdminInfo);

  useLoader(async () => {
    console.log("Admin init");
    emit(new AdminInfo(await AdminInfoConnection()));
  });

  switch (adminInfo?.data?.type) {
    case "fail":
      return <AdminLoginView />;

    case "success":
      break;
  }

  return createElement(Fragment, null, children);
};
