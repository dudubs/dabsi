import {ElementInput} from "../input/ElementInput";
import {InputMap} from "../input/InputMap";
import {TextInput} from "../input/TextInput";
import {NoRpc} from "../NoRpc";
import {RpcConnection} from "../Rpc";
import {RpcPartialConfig} from "../RpcPartialConfig";
import {ElementWidget} from "./ElementWidget";
import {Widget} from "./Widget";


export default function () {

    // ElementInput
    {

        const iw = ElementWidget<{ hello: string }>()(TextInput())

        const co = {
            getElement: () => ({hello: "foo"}),
            targetConfig: {},
        };
        iw.createRpcHandler(co);

        iw.getContext(co).getElement().then(e=>{
            // @ts-expect-error
            e.trim
        })

        // @ts-expect-error
        iw.TMetaType?.TWidget.Element.trim

        test<RpcConnection<typeof iw>>(async c=>{
            const e = await c.getElement();
            // @ts-expect-error
            e.trim

            e[1].trim;

            // @ts-expect-error
            e[1].x;
        })



        const i = InputMap({
            msg: iw
        });


        InputMap({
            msg: ElementWidget<{ hello: string }>()(TextInput())
        }).TMetaType?.TRpc.Connection.getElement().then(e => {
            // @ts-expect-error
            e.msg.trim
        })
    }

    {
        const widget = null as unknown as Widget<{
            Connection: {},
            Config: { xs: string, xn: number },
            Context: {}
            Props: {}
            Handler: {}
            Element: {}
            Controller: NoRpc
        }>;

        widget
            // @ts-expect-error
            .createRpcHandler(undefined);

        widget
            .createRpcHandler({xn: 10, xs: "hello"});

        widget
            // @ts-expect-error
            .createRpcHandler({xn: 10});

        RpcPartialConfig(widget, {xs: "hello"})
            .createRpcHandler({xn: 10});

        RpcPartialConfig(widget, {xs: "hello"})
            // @ts-expect-error
            .createRpcHandler({});

        RpcPartialConfig(widget, {xs: "hello"})
            // @ts-expect-error
            .createRpcHandler(undefined);

        RpcPartialConfig(widget, {xs: "hello", xn: 10})
            .createRpcHandler({xn: 10});

        RpcPartialConfig(widget, {xs: "hello", xn: 10})
            .createRpcHandler({});

        RpcPartialConfig(widget, {xs: "hello", xn: 10})
            .createRpcHandler(undefined);
    }


    // Widget with undefined config
    {
        const widget = null as unknown as Widget<{
            Connection: {},
            Config: { xs: string, xn: number } | undefined,
            Context: {}
            Props: {}
            Handler: {}
            Element: {}
            Controller: NoRpc
        }>;

        widget
            .createRpcHandler(undefined);

        widget
            .createRpcHandler({xn: 10, xs: "hello"});

        widget
            // @ts-expect-error
            .createRpcHandler({xn: 10});

        RpcPartialConfig(widget, {xs: "hello"})
            .createRpcHandler({xn: 10});

        RpcPartialConfig(widget, {xs: "hello"})
            // @ts-expect-error
            .createRpcHandler({});

        RpcPartialConfig(widget, {xs: "hello"})
            .createRpcHandler(undefined);

        RpcPartialConfig(widget, {xs: "hello", xn: 10})
            .createRpcHandler({xn: 10});

        RpcPartialConfig(widget, {xs: "hello", xn: 10})
            .createRpcHandler({});

        RpcPartialConfig(widget, {xs: "hello", xn: 10})
            .createRpcHandler(undefined);
    }
}
declare function test<T>(value: T, callback?: (value: T) => void): T;
declare function test<T>(callback?: (value: T) => void): T;
