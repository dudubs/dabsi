import { BaseType } from "../data/BaseType";
import { DataSource, DataSourceFactory } from "../data/DataSource/DataSource";
import { Command } from "../typerpc/Command";
import { NoRpc } from "../typerpc/NoRpc";
import { Parameter } from "../typerpc/Parameter";
import {
  AnyRpc,
  Rpc,
  RpcConfig,
  RpcHandler,
  RpcHandlerFn,
} from "../typerpc/Rpc";
import { RpcConfigurator } from "../typerpc/RpcConfigurator";
import { RpcConfigFactory } from "../typerpc/RpcGenericConfig";
import { RpcMap } from "../typerpc/RpcMap";
import {
  AnyWidget,
  TWidget,
  Widget,
  WidgetBuilder,
} from "../typerpc/widget/Widget";
import { User } from "./User";

/*



 */

export type AuthenticatedRpc<T extends AnyRpc> = RpcMap<{
  getTarget: Parameter<T, { accessToken: string }>;
  getAccessToken: Command<() => { accessToken: string }>;
}>;

export type Login<T extends AnyWidget> = WidgetBuilder<{
  Config: {
    source: DataSource<User>;
    targetConfig: RpcConfigFactory<User, T>;
  };

  Element: {
    user?: {
      $key: string;
      firstName?: string;
      lastName?: string;
    };
  };

  Props: {
    target: T;
  };
  Controller: RpcMap<{
    target: T;
  }>;
}>;

export type AnyLogin = Login<AnyWidget>;

// Session()
// Session Rpc
export const PasswordLogin = RpcConfigurator(
  Command<(userName: string, password: string) => boolean>(),
  (config) => {}
);

export function Login<T extends AnyWidget>(target: T) {}
