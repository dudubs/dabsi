import { Override, Typing } from "../../common/typings";
import { DataRow } from "../../data/DataRow";
import { DataSource } from "../../data/DataSource";
import { ConfigFactory } from "../ConfigFactory";
import { Page } from "../widget/page/Page";
import { PageHandler } from "../widget/page/PageHandler";
import { DataParameterHandler } from "./DataParameterHandler";
import { Parameter } from "./Parameter";
import { AnyRpc, RpcType, RpcUnresolvedConfig } from "../Rpc";
import { RpcConfigHook, RpcConfigHookHandler } from "../RpcConfigHook";
import { GenericConfig } from "../GenericConfig";

export type DataParameterConfig<T extends TDataParameter> = {
  source: DataSource<TDataParameter["Value"]>;
  getTargetConfig: ConfigFactory<
    RpcUnresolvedConfig<TDataParameter["Target"]>,
    [Args: DataRow<TDataParameter["Value"]>]
  >;
};

export type DataParameter<T extends TDataParameter> = RpcConfigHook<{
  Target: Parameter<T & { Data: string }>;

  Config: GenericConfig<
    <Value>(
      config: DataParameterConfig<
        Override<
          TDataParameter,
          {
            Value: Value;
          }
        >
      >
    ) => DataParameterConfig<T>
  >;
}>;

export type AnyDataParameter = DataParameter<TDataParameter>;

export function DataParameter<Target extends AnyRpc>(
  target: Target
): DataParameter<{
  Target: Target;
  Value: any;
}> {
  return RpcConfigHook(
    Parameter<string>()<Target>(target),
    DataParameterHandler as RpcConfigHookHandler<
      DataParameter<{
        Target: Target;
        Value: any;
      }>
    >
  );
}

export type TDataParameter = {
  Target: AnyRpc;
  // TODO: RenameTo: Row
  Value: any;
};
