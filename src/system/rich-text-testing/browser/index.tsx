import { MuiFormView } from "@dabsi/browser/mui/rpc/MuiFormView";
import SystemRouter from "@dabsi/system/core/common/SystemRouter";
import FocusableAreaDev from "@dabsi/system/rich-text-testing/browser/focusable-area/Dev";
import { RichTextTestingConnection } from "@dabsi/system/rich-text-testing/common/RichTextTestingRpc";
import ReactRouterView from "@dabsi/typerouter/ReactRouterView";
import Router from "@dabsi/typerouter/Router";
import { WidgetRouterView } from "@dabsi/typerpc/widget/WidgetRouterView";
import React from "react";
const router = SystemRouter.register("rich-text-testing", Router());

WidgetRouterView(router, RichTextTestingConnection.form, props => {
  return <MuiFormView {...props} />;
});

ReactRouterView(router.register("dev", Router()), () => {
  return <FocusableAreaDev />;
});
