import { inspect } from "../../../logging";
import {
  AnyRpc,
  RpcConnection,
  RpcHandler,
  RpcUnresolvedConfig,
} from "../../Rpc";
import { AnyWidget, WidgetElement } from "../../widget/Widget";
import { AnyInput, InputError, InputValue, InputValueData } from "../Input";
import { CaseTester } from "./CaseTester";
import { WidgetViewClass, WidgetViewTester } from "./WidgetViewTester";

export class RpcTester<T extends AnyRpc> {
  constructor(public rpc: T) {}

  testConfig = CaseTester<RpcUnresolvedConfig<T>>("config");

  testConnection<T extends AnyRpc>(
    this: RpcTester<T>,
    callback: (connection: RpcConnection<T>) => void
  ) {
    this.testConfig.test(config => {
      callback(this.rpc.createRpcConnection(this.rpc.createRpcCommand(config)));
    });
  }

  testHandler<T extends AnyRpc>(
    this: RpcTester<T>,
    callback: (handler: RpcHandler<T>) => void
  ) {
    this.testConfig.test(async config => {
      callback(await this.rpc.resolveRpcHandler(config));
    });
  }

  testWidgetElement<T extends AnyWidget>(
    this: RpcTester<T>,
    callback: (t: { readonly element: WidgetElement<T> }) => void
  ) {
    this.testHandler(ctx => {
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
    data: InputValueData<T>,
    value: InputValue<T>
  ) {
    this.testHandler(conn => {
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
    data: InputValueData<T>,
    error: InputError<T>
  ) {
    this.testHandler(conn => {
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

  testWidgetView<T extends AnyWidget, VC extends WidgetViewClass<T>>(
    this: RpcTester<T>,
    viewClass: VC,
    callback: (tester: WidgetViewTester<T, VC>) => void
  ) {
    this.testConnection(connection => {
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
