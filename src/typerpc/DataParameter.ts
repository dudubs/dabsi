import { Typing } from "../common/typings";
import { DataRow } from "../data/DataRow";
import { DataSource } from "../data/DataSource";
import { DataParameterHandler } from "./DataParameterHandler";
import { Parameter } from "./Parameter";
import { AnyRpc } from "./Rpc";
import { RpcConfigurator } from "./RpcConfigurator";
import { RpcConfigFactory2, RpcGenericConfigFn } from "./RpcGenericConfig";

export type DataParameter<R extends AnyRpc> = RpcConfigurator<
  Parameter<R, string>,
  <D>(config: DataParameterConfig<D, R>) => DataParameterConfig<any, R>
>;
export type AnyDataParameter = DataParameter<AnyRpc>;

export function DataParameter<R extends AnyRpc>(target: R): DataParameter<R> {
  return <any>(
    RpcConfigurator<AnyDataParameter>(
      Parameter(Typing<string>(), target),
      DataParameterHandler
    )
  );
}

export type DataParameterConfig<D, R extends AnyRpc> = {
  source: DataSource<D>;
  getTargetConfig: RpcConfigFactory2<DataRow<D>, R>;
};
