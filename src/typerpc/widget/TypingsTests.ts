import { InputMap } from "../input/input-map/InputMap";
import { TextInput } from "../input/TextInput";
import { NoRpc } from "../NoRpc";
import { RpcConnection } from "../Rpc";
import { RpcPartialConfig } from "../RpcPartialConfig";
import { ElementWidget } from "../old/ElementWidget";
import { Widget } from "./Widget";

export default function () {
  // ElementInput
  {
    const iw = ElementWidget<{ hello: string }>()(TextInput());

    const co = {
      getElement: () => ({ hello: "foo" }),
      targetConfig: {},
    };
    iw.createRpcCommand(co);

    iw.getContext(co)
      .call("getElement")
      .then(e => {
        // @ts-expect-error
        e.trim;
      });

    // @ts-expect-error
    iw.TMetaType?.TWidget.Element.trim;

    test<RpcConnection<typeof iw>>(async c => {
      const e = await c.getElement();
      // @ts-expect-error
      e.trim;

      e[1].trim;

      // @ts-expect-error
      e[1].x;
    });

    const i = InputMap({
      msg: iw,
    });

    InputMap({
      msg: ElementWidget<{ hello: string }>()(TextInput()),
    })
      .TMetaType?.TRpc.Connection.getElement()
      .then(e => {
        // @ts-expect-error
        e.msg.trim;
      });
  }

  {
    const widget = (null as unknown) as Widget<{
      Connection: {};
      Config: { xs: string; xn: number };
      Handler: {};
      Props: {};
      Handler: {};
      Element: {};
      Controller: NoRpc;
    }>;

    widget
      // @ts-expect-error
      .createRpcCommand(undefined);

    widget.createRpcCommand({ xn: 10, xs: "hello" });

    widget
      // @ts-expect-error
      .createRpcCommand({ xn: 10 });

    RpcPartialConfig(widget, { xs: "hello" }).createRpcCommand({ xn: 10 });

    RpcPartialConfig(widget, { xs: "hello" })
      // @ts-expect-error
      .createRpcCommand({});

    RpcPartialConfig(widget, { xs: "hello" })
      // @ts-expect-error
      .createRpcCommand(undefined);

    RpcPartialConfig(widget, { xs: "hello", xn: 10 }).createRpcCommand({
      xn: 10,
    });

    RpcPartialConfig(widget, { xs: "hello", xn: 10 }).createRpcCommand({});

    RpcPartialConfig(widget, { xs: "hello", xn: 10 }).createRpcCommand(
      undefined
    );
  }

  // Widget with undefined config
  {
    const widget = (null as unknown) as Widget<{
      Connection: {};
      Config: { xs: string; xn: number } | undefined;
      Handler: {};
      Props: {};
      Handler: {};
      Element: {};
      Controller: NoRpc;
    }>;

    widget.createRpcCommand(undefined);

    widget.createRpcCommand({ xn: 10, xs: "hello" });

    widget
      // @ts-expect-error
      .createRpcCommand({ xn: 10 });

    RpcPartialConfig(widget, { xs: "hello" }).createRpcCommand({ xn: 10 });

    RpcPartialConfig(widget, { xs: "hello" })
      // @ts-expect-error
      .createRpcCommand({});

    RpcPartialConfig(widget, { xs: "hello" }).createRpcCommand(undefined);

    RpcPartialConfig(widget, { xs: "hello", xn: 10 }).createRpcCommand({
      xn: 10,
    });

    RpcPartialConfig(widget, { xs: "hello", xn: 10 }).createRpcCommand({});

    RpcPartialConfig(widget, { xs: "hello", xn: 10 }).createRpcCommand(
      undefined
    );
  }
}

declare function test<T>(value: T, callback?: (value: T) => void): T;
declare function test<T>(callback?: (value: T) => void): T;
