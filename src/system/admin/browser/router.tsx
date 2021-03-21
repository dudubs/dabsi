import { MuiAdminView } from "@dabsi/system/admin/browser/MuiAdminView";
import { AdminInfo, AdminRouter } from "@dabsi/system/admin/common";
import { RouterView } from "@dabsi/typerouter/view";
import { Emittable } from "@dabsi/view/react/reactor/Reactor";
import React from "react";

RouterView.define(
  AdminRouter,
  { wrapper: true, disableIndex: false },
  ({ children }) => {
    return <MuiAdminView>{children}</MuiAdminView>;
  }
);

export const AdminInfoEvent = Emittable<AdminInfo>();
