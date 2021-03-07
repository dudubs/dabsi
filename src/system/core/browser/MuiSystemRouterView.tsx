import { MuiProvider } from "@dabsi/browser/mui/MuiSystem";
import { SystemRouter } from "@dabsi/system/core/common/router";
import { RouterView } from "@dabsi/typerouter/view";
import React from "react";

RouterView.wrap(SystemRouter, ({ children }) => (
  <MuiProvider>{children}</MuiProvider>
));
