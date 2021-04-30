import MuiAdminWrapper from "@dabsi/system/admin/browser/MuiAdminWrapper";
import AdminRouter from "@dabsi/system/admin/view/AdminRouter";
import { RouterView } from "@dabsi/typerouter2/view/RouterView";
import React from "react";

RouterView.define(AdminRouter, [
  {
    $wrapper: ({ children }) => <MuiAdminWrapper>{children}</MuiAdminWrapper>,
  },
  () => <>admin index</>,
]);
