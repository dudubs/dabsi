import React from "react";
import { MuiProvider } from "../../../browser/mui/MuiSystem";
import { ReactRouterView } from "../../../typerouter/ReactRouterView";
import { SystemRouter } from "../common/SystemRouter";

ReactRouterView(SystemRouter, {
  wrap: ({ children }) => <MuiProvider>{children}</MuiProvider>,
});
