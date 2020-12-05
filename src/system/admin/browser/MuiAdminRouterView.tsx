import * as React from "react";
import { Emittable } from "../../../react/reactor/Reactor";
import { ReactRouterView } from "../../../typerouter/ReactRouterView";
import { AdminInfo, AdminRouter } from "../common";
import { MuiAdminView } from "./MuiAdminView";

ReactRouterView(AdminRouter, {
  wrap: ({ children }) => {
    return <MuiAdminView>{children}</MuiAdminView>;
  },
});

export const AdminInfoEvent = Emittable<AdminInfo>();
