import { ReactRouterView } from "../../../typerouter/ReactRouterView";
import { AdminRouter } from "../common";
import { AdminWrapperView } from "./AdminWrapperView";
import { MuiAdminView } from "./MuiAdminView";

ReactRouterView(AdminRouter, MuiAdminView);

ReactRouterView(AdminRouter, {
  wrap: AdminWrapperView,
});
