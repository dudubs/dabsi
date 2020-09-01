// TODO: Rename to *Input
import {Awaitable} from "../../common/typings";
import {AnyRpc} from "../Rpc";
import {AbstractWidgetContext, Widget, WidgetContextClass} from "../Widget";


// TODO: R extends AnyRpc

export type TInput = {
    Data: any
    Value: any,
    Controller: AnyRpc,
    Props: object,
    Config: any,
    Element: any,
    Error: any
};

export type BaseInputContext<T extends TInput> = {

    loadAndCheck(data: T['Data']): Promise<TInputCheckResult<T>>
};


export type Input<T extends TInput> = Widget<{

    Connection: {
        check(data: T['Data']): Promise<T['Error'] | undefined>
    }

    Config: T['Config']

    Context: BaseInputContext<T>

    Handler: {
        check(data: T['Data']): Awaitable<TInputCheckResult<T>>;
    }

    Props: T['Props'] & {
        TInput?: T;

    }

    Element: T['Element']

    Controller: T['Controller']


}>;

export abstract class AbstractInputContext<T extends AnyInput>
    extends AbstractWidgetContext<T>
    implements BaseInputContext<InputType<T>> {

    abstract loadAndCheck(data: InputType<T>["Data"]):
        Promise<InputCheckResult<T>> ;


}

export type InputType<T extends AnyInput> =
    NonNullable<T['TInput']>;
export type ErrorOrValue<E, V> = { error: E } | { value: V };

export type TInputCheckResult<T extends TInput> =
    ErrorOrValue<T['Error'], T['Value']>;


export type InputCheckResult<T extends AnyInput> =
    TInputCheckResult<InputType<T>>;


export type AnyInput = Input<TInput>;

export type InputOptions<T extends AnyInput> ={

    controller: InputType<T>['Controller'],

    props: InputType<T>['Props'];

    getContextClass: () => WidgetContextClass<T>

};

export function Input<T extends AnyInput>(options: InputOptions<T>): T {
    return <T>Widget<AnyInput>({
        props: options.props,
        controller: options.controller,
        getContextClass: options.getContextClass,
        handler: {
            check: async (context, data) => {
                const result = await context
                    .loadAndCheck(data)
                if ('error' in result)
                    return result.error
            },
        },
        createConnection: (options) => {
            return ({
                check: data => options.handler(["check", data]),
            });
        }
    })
}

