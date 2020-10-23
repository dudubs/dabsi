import { RpcConfigOld } from "./old/Old";
import { AnyRpc, Rpc, RpcUndefinedConfig } from "./Rpc";

declare function test<T>(value: T, callback?: (value: T) => void): T;

export default function () {
  // RpcUndefinedConfig
  {
    type UR1 = Rpc<{
      Connection: any;
      Handler: any;
      Config: { xs: string } | undefined;
    }>;

    type UR2 = Rpc<{
      Connection: any;
      Handler: any;
      Config: { xs2: string } | undefined;
    }>;

    type NUR = Rpc<{
      Connection: any;
      Handler: any;
      Config: { xs: string };
    }>;

    type R<T extends AnyRpc> = Rpc<{
      Connection: any;
      Handler: any;
      Config:
        | { xn: number; c: RpcConfigOld<T> | RpcUndefinedConfig<T> }
        | RpcUndefinedConfig<T>;
    }>;

    test<RpcUndefinedConfig<UR1>>(undefined);

    test<RpcUndefinedConfig<R<UR1>>>(undefined);

    // @ts-expect-error
    test<RpcUndefinedConfig<NUR>>(undefined);

    // @ts-expect-error
    test<RpcUndefinedConfig<R<NUR>>>(undefined);

    // @ts-expect-error
    test<RpcUndefinedConfig<UR1 & NUR>>(undefined);

    test<RpcUndefinedConfig<UR1 & UR2>>(undefined);

    test<RpcUndefinedConfig<UR1 & UR2>>(undefined);

    test<RpcUndefinedConfig<R<UR2> & R<UR1>>>(undefined);

    // @ts-expect-error
    test<RpcUndefinedConfig<R<UR2> & R<NUR>>>(undefined);
  }
}
