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
import { RpcConfigFactory2 } from "../typerpc/RpcGenericConfig";
import { RpcMap } from "../typerpc/RpcMap";
import {
  AnyWidget,
  TWidget,
  Widget,
  WidgetBuilder,
} from "../typerpc/widget/Widget";
import { UserEntity } from "./UserEntity";

export type Login<T extends AnyWidget> = WidgetBuilder<{
  Config: {
    source: DataSource<UserEntity>;
    targetConfig: RpcConfigFactory2<UserEntity, T>;
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

export function Login<T extends AnyWidget>(target: T) {}
