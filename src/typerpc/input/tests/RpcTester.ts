import * as TestRenderer from "react-test-renderer";
import { ReactTestRenderer } from "react-test-renderer";
import { Timeout } from "../../../common/async/Timeout";
import { defined } from "../../../common/object/defined";
import { AnyContextualRpc, ContextualRpcContext } from "../../ContextualRpc";
import { AnyRpc, RpcConfig, RpcConnection } from "../../Rpc";
import { AnyWidget, WidgetElement } from "../../widget/Widget";
import { WidgetView, WidgetViewProps } from "../../widget/WidgetView";
import { AnyInput, InputCheckResult, InputData } from "../Input";
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
      describe("of:connection", () => {
        callback(
          this.rpc.createRpcConnection(this.rpc.createRpcHandler(config))
        );
      });
    });
  }

  testContext<T extends AnyContextualRpc>(
    this: RpcTester<T>,
    callback: (context: ContextualRpcContext<T>) => void
  ) {
    this.testConfig.test((config) => {
      describe("of:context", () => {
        callback(this.rpc.getContext(config));
      });
    });
  }

  testWidgetElement<T extends AnyWidget>(
    this: RpcTester<T>,
    title: string,
    callback: (element: WidgetElement<T>) => void
  ) {
    describe("widget:element", () => {
      this.testConnection((conn) => {
        it(title, async () => {
          await callback(await conn.getElement());
        });
      });

      this.testContext((ctx) => {
        it(title, async () => {
          await callback(await ctx.getElement());
        });
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
      // let view;
      // let reactTester: ReactTestRenderer;
      //
      // beforeEach(async () => {
      //   reactTester = TestRenderer.create(
      //     render!(viewClass, {
      //       connection: connection,
      //       element: await connection.getElement(),
      //     })
      //   );
      //   await Timeout(0);
      //   view = defined(reactTester.root.findByType(viewClass), "No view")
      //     .instance;
      // });
      //
      // afterEach(() => {
      //   reactTester.unmount();
      // });

      callback(new WidgetViewTester(viewClass, connection));
    });
  }
}
