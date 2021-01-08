import { MuiFormView } from "@dabsi/browser/mui/rpc/MuiFormView";
import SystemRouter from "@dabsi/system/core/common/SystemRouter";
import { TestRichTextFormConnection } from "@dabsi/system/rich-text-testing/common/TestRichTextForm";
import Router from "@dabsi/typerouter/Router";
import { WidgetRouterView } from "@dabsi/typerpc/widget/WidgetRouterView";
import React from "react";
const router = SystemRouter.register("rich-text-testing", Router());

WidgetRouterView(router, TestRichTextFormConnection, props => {
  return <MuiFormView {...props} />;
});
