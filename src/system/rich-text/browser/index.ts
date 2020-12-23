import SystemRouter from "@dabsi/system/core/SystemRouter";
import DevView from "@dabsi/system/rich-text/browser/Dev";
import ReactRouterView from "@dabsi/typerouter/ReactRouterView";
import Router from "@dabsi/typerouter/Router";

const DevRouter = SystemRouter.register("dev", Router());

ReactRouterView(DevRouter, { renderIndex: DevView });
