import MuiAdminWrapper from "@dabsi/system/admin/browser/MuiAdminWrapper";
import AdminRouter from "@dabsi/system/admin/view/AdminRouter";
import { RouterView } from "@dabsi/typerouter/view/RouterView";
import React from "react";

export default RouterView(AdminRouter, $ =>
  $.wrap(({ children }) => {
    return <MuiAdminWrapper>{children}</MuiAdminWrapper>;
  }).index(() => {
    return <>admin index</>;
  })
);
