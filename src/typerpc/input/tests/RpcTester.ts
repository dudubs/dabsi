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
    title: string,
    callback: (element: WidgetElement<T>) => void
  ) {
    describe("widget:element", () => {
      describe("of:connection", () => {
        this.testConnection((conn) => {
          it(title, async () => {
            await callback(await conn.getElement());
          });
        });
      });
      describe("of:context", () => {
        this.testContext((ctx) => {
          it(title, async () => {
            await callback(await ctx.getElement());
          });
        });
      });
    });
  }

  testInputValue<T extends AnyInput>(
    this: RpcTester<T>,
    data: InputData<T>,
    value: InputValue<T>
  ) {
    describe("expect inputValue", () => {
      this.testContext((conn) => {
        it(`expect input value for data ${inspect(data)} will be ${inspect(
          value
        )}`, async () => {
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
      it(`expect input error for data ${inspect(data)} will be ${inspect(
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

  testInputData<T extends AnyInput>(
    this: RpcTester<T>,
    title: string,
    data: InputData<T>,
    callback: (result: InputCheckResult<T>) => void
  ) {
    describe("input:data", () => {
      this.testContext((conn) => {
        it(title, async () => {
          await callback(await conn.loadAndCheck(data));
        });
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
