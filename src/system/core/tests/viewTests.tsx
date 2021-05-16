import { PartialUndefinedKeys } from "@dabsi/common/typings2/PartialUndefinedKeys";
import { UndefinedIfEmptyObject } from "@dabsi/common/typings2/UndefinedIfEmptyObject";
import {
  defineSystemViewCompoent,
  SystemView,
  SystemViewBuilder,
  SystemViewComponentMap,
} from "@dabsi/system/core/view/SystemView";
import { RpcContextual, RpcType } from "@dabsi/typerpc2";
import { createRpcHandler } from "@dabsi/typerpc2/createRpcHandler";
import { RpcChildMap } from "@dabsi/typerpc2/RpcChildMap";
import { RpcConfigurator } from "@dabsi/typerpc2/RpcConfig";
import {
  AnyWidget,
  Widget,
  WidgetElement,
} from "@dabsi/typerpc2/widget/Widget";
import {
  AnyWidgetWithConfig,
  WidgetHandler,
  WidgetWithConfig,
} from "@dabsi/typerpc2/widget/WidgetHandler";
import EmptyFragment from "@dabsi/view/react/utils/EmptyFragment";
import React from "react";
import ReactTestRenderer from "react-test-renderer";

class W1 extends Widget<{ type: "w1" }> {}

class W2 extends Widget<{ type: "w2" }> {
  @RpcContextual() w1!: W1;
}

interface W1 extends WidgetWithConfig<W1, undefined> {}
interface W2
  extends WidgetWithConfig<
    W2,
    UndefinedIfEmptyObject<
      PartialUndefinedKeys<{ w1Config: RpcConfigurator<W1> }>
    >
  > {}
interface BaseW3<T>
  extends WidgetWithConfig<BaseW3<T>, { xConfig: RpcConfigurator<T> }> {}

class BaseW3<T extends AnyWidget> extends Widget<{
  type: "w3";
  x: WidgetElement<T>;
}> {
  wx!: T;
}

function W3<T extends AnyWidget>(x: RpcType<T>): RpcType<BaseW3<T>> {
  class W3 extends BaseW3<T> {
    @RpcContextual(() => x) wx!: T;

    // @ts-ignore
    static get name() {
      return `W3<${x.name}>`;
    }
  }
  return W3;
}

const W3_1 = W3(W1);
const W3_2 = W3(W2);

class W4 extends Widget<{ type: "w4" }> {
  @RpcContextual(() => W3_1)
  w3_1!: BaseW3<W1>;

  @RpcContextual(() => W3_2)
  w3_2!: BaseW3<W2>;
}

WidgetHandler(
  W1,
  { configCanBeUndefined: true },
  {
    getElement() {
      return { type: "w1" };
    },
  }
);

WidgetHandler(
  W2,
  { configCanBeUndefined: true },
  {
    handleW1(rpcType) {
      return createRpcHandler(rpcType, this.config.w1Config);
    },
    getElement() {
      return { type: "w2" };
    },
  }
);

WidgetHandler(
  BaseW3 as RpcType<BaseW3<AnyWidgetWithConfig>>,
  {},
  {
    handleWx(rpcType) {
      return createRpcHandler(rpcType, this.config.xConfig);
    },
    async getElement() {
      return {
        type: "w3",
        x: await (await this.getContextualHandler("wx")).getElement(null),
      };
    },
  }
);

// it("", () => {
//   //

//   ReactTesterRenderer.create(
//     <SystemView
//       build={$ => {
//         $(R, {
//           w3_1: () => EmptyFragment,
//         });
//       }}
//     >
//       <></>
//     </SystemView>
//   );
// });

const testBuilder = (builder: SystemViewBuilder) =>
  new Promise<SystemViewComponentMap>(resolve => {
    ReactTestRenderer.create(
      <SystemView build={builder}>
        <SystemView.ComponentMapContext.Consumer>
          {map => {
            resolve(map);
            return EmptyFragment;
          }}
        </SystemView.ComponentMapContext.Consumer>
      </SystemView>
    );
  });

fit("expect to define with child-keys", async () => {
  const map: SystemViewComponentMap = new RpcChildMap();
  defineSystemViewCompoent(map, W3_2, {
    wx: { w1: () => EmptyFragment },
  });
  expect(map.get(W4, ["w3_2", "wx", "w1"])).toBeDefined();
});
