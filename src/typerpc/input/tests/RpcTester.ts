import { inspect } from "../../../logging";
import { AnyContextualRpc, ContextualRpcContext } from "../../ContextualRpc";
import { AnyRpc, RpcConfig, RpcConnection } from "../../Rpc";
import { AnyWidget, WidgetElement } from "../../widget/Widget";
import { WidgetView, WidgetViewProps } from "../../widget/WidgetView";
import {
  AnyInput,
  InputCheckResult,
  InputData,
  InputError,
  InputValue,
} from "../Input";
import { CaseTester } from "./CaseTester";
import { WidgetViewTester } from "./WidgetViewTester";

export class RpcTester<T extends AnyRpc> {
  constructor(public rpc: T) {}

  testConfig = CaseTester<RpcConfig<T>>("config");

  testConnection<T extends AnyRpc>(
    this: RpcTester<T>,
    callback: (connection: RpcConnection<T>) => void
  ) {
    this.testConfig.test((config) => {
      callback(this.rpc.createRpcConnection(this.rpc.createRpcHandler(config)));
    });
  }

  testContext<T extends AnyContextualRpc>(
    this: RpcTester<T>,
    callback: (context: ContextualRpcContext<T>) => void
  ) {
    this.testConfig.test((config) => {
      callback(this.rpc.getContext(config));
    });
  }

  testWidgetElement<T extends AnyWidget>(
    this: RpcTester<T>,
    callback: (t: { readonly element: WidgetElement<T> }) => void
  ) {
    this.testContext((ctx) => {
      describe("test:widget element", () => {
        let element;
        beforeAll(async () => {
          element = await ctx.getElement();
        });
        callback({
          get element() {
            return element;
          },
        });
      });
    });
  }

  testInputValue<T extends AnyInput>(
    this: RpcTester<T>,
    data: InputData<T>,
    value: InputValue<T>
  ) {
    this.testContext((conn) => {
      describe("test:input", () => {
        it(`data:${inspect(data)} expectValue:${inspect(value)}`, async () => {
          const result = await conn.loadAndCheck(data);
          if ("error" in result) {
            throw new Error(`unexpected error ${result.error}`);
          }
          expect(result.value).toEqual(value);
        });
      });
    });
  }

  testInputError<T extends AnyInput>(
    this: RpcTester<T>,
    data: InputData<T>,
    error: InputError<T>
  ) {
    this.testContext((conn) => {
      it(`test:input data:${inspect(data)} expectError:${inspect(
        error
      )}`, async () => {
        const result = await conn.loadAndCheck(data);
        if ("error" in result) {
          expect(result.error).toEqual(error);
        } else {
          fail(`No error`);
        }
      });
    });
  }

  testWidgetView<
    T extends AnyWidget,
    VC extends new (props: WidgetViewProps<RpcConnection<T>>) => WidgetView<any>
  >(
    this: RpcTester<T>,
    viewClass: VC,
    callback: (tester: WidgetViewTester<T, VC>) => void
  ) {
    this.testConnection((connection) => {
      describe("view:" + viewClass.name, () => {
        callback(new WidgetViewTester(viewClass, connection));
      });
    });
  }
}

export function testRpc<T extends AnyRpc>(
  rpc: T,
  callback?: (t: RpcTester<T>) => void
): RpcTester<T> {
  const t = new RpcTester(rpc);
  callback?.(t);
  return t;
}
