import React from "react";
import { MuiSystem } from "../../../browser/mui/MuiSystem";
import { ReactRouterView } from "../../../typerouter/ReactRouterView";
import { SystemRouter } from "../common/SystemRouter";

ReactRouterView(SystemRouter, {
  wrap: ({ children }) => <MuiSystem>{children}</MuiSystem>,
});
