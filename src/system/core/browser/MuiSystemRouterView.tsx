import React from "react";
import { MuiProvider } from "@dabsi/browser/mui/MuiSystem";
import ReactRouterView from "@dabsi/typerouter/ReactRouterView";
import SystemRouter from "@dabsi/system/core/SystemRouter";

ReactRouterView(SystemRouter, {
  wrap: ({ children }) => <MuiProvider>{children}</MuiProvider>,
});
