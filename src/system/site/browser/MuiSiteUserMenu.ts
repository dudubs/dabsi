import { MuiAction } from "@dabsi/browser/mui/MuiActions";
import RouterViewNavigator from "@dabsi/typerouter/view/RouterViewNavigator";
import { ViewContextMap } from "@dabsi/view/react/ViewContext";

export default {
  customActions: {} as Record<
    string,
    | MuiAction
    | ((props: {
        navigator: RouterViewNavigator;
        context: ViewContextMap;
      }) => MuiAction)
  >,
};
