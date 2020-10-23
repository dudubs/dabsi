import { BaseType } from "../data/BaseType";
import { DataSource, DataSourceFactory } from "../data/DataSource/DataSource";
import { RpcFn } from "../typerpc/RpcFn";
import { NoRpc } from "../typerpc/NoRpc";
import { RpcConfigOld } from "../typerpc/old/Old";
import { Parameter } from "../typerpc/parameter/Parameter";
import { AnyRpc, Rpc, RpcHandlerTypeOld, RpcCommand } from "../typerpc/Rpc";
import { RpcConfigurator } from "../typerpc/old/RpcConfigurator";
import { RpcConfigFactory2 } from "../typerpc/GenericConfig";
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
