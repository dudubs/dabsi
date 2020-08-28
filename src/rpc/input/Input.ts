// TODO: Rename to *Input
import {Awaitable} from "../../common/typings";
import {ContextualRpcFactory} from "../ContextualRpc";
import {AnyRpc} from "../Rpc";
import {Widget} from "../Widget";


// TODO: R extends AnyRpc

export type TInput = {
    Data: any
    Value: any,
    Controller: AnyRpc,
    Static: object,
    Config: any,
    Element: any,
    Error: any
};

export type TInputRpc<T extends TInput> = {

    Connection: {
        check(data: T['Data']): Promise<T['Error'] | undefined>
    }

    Config: T['Config']

    Context: {
        loadAndCheck(data: T['Data']): Awaitable<InputCheckResult<T>>
    }

    Handler: {
        check(data: T['Data']): Awaitable<InputCheckResult<T>>;
    }

    Static: T['Static'] & {
        TInput?: T;

    }

    Element: T['Element']

    Controller: T['Controller']

};


export type Input<T extends TInput> = Widget<TInputRpc<T>>;


export type InputType<T extends AnyInput> =
    T extends Input<infer U> ? U : never;

export type InputCheckResult<T extends TInput> =
    { error: T['Error'] } | { value: T['Value'] };


export type AnyInput = Input<TInput>;

export type AnyInputMap = Record<string, AnyInput>;

export type InputProps<T extends TInput> = {

    controller: T['Controller'],

    static: T['Static'];

    createContext: ContextualRpcFactory<Input<T>>;
};

export function Input<T extends TInput>(props: InputProps<T>): Input<T> {
    return Widget<TInputRpc<T>>({
        ...props,
        handlers: {
            check: async (context, data) => {
                const result = await context
                    .loadAndCheck(data)
                if ('error' in result)
                    return result.error
            },
        },
        createConnection: handler => ({
            static: props.static,
            controller: props.controller.createRpcConnection(
                payload => handler(["controller", payload])
            ),
            check: data => handler(["check", data]),
        })
    })
}
