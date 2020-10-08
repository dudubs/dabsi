import { withHooks } from "../utils/withHooks";
import {
  AnyReactRouterOld,
  ReactRouterRendererProps,
  ReactRouterRenderHook,
} from "./OldReactRouter";

export function createReactRouterRendererHook(
  toRender: (props: ReactRouterRendererProps<any>) => boolean,
  getRouter?: (router: AnyReactRouterOld) => AnyReactRouterOld
): ReactRouterRenderHook {
  return function <T extends AnyReactRouterOld>(this: T, callback): any {
    return (getRouter ? getRouter(this) : this).render(
      withHooks((props) => (toRender(props) ? callback(props) : props.children))
    );
  };
}
