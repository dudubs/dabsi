// TODO: Rename to *Input
import {Awaitable, HasKeys, If, Is, Not, PartialUndefinedKeys} from "../../common/typings";
import {ContextualRpcType} from "../ContextualRpc";
import {NoRpc} from "../NoRpc";
import {AnyRpc} from "../Rpc";
import {RpcGenericConfigFn} from "../RpcGenericConfig";
import {BaseWidgetContext, Widget, WidgetContextClass, WidgetContextConfig, WidgetType} from "../widget/Widget";


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


export type Input<T extends TInput> = {
    TInput?: T
} & Widget<{

    Connection: {
        check(data: T['Data']): Promise<T['Error'] | undefined>
    }

    Config: T['Config']

    Context: BaseInputContext<T>

    Handler: {
        check(data: T['Data']): Awaitable<TInputCheckResult<T>>;
    }

    Props: T['Props'];

    Element: T['Element']

    Controller: T['Controller']

}>;

export type InputType<T extends AnyInput> =
    NonNullable<T['TInput']>;
export type ErrorOrValue<E, V> = { error: E } | { value: V };

export type TInputCheckResult<T extends TInput> =
    ErrorOrValue<T['Error'], T['Value']>;


export type InputCheckResult<T extends AnyInput> =
    TInputCheckResult<InputType<T>>;


export type AnyInput = Input<TInput>;

export type InputOptions<Input extends AnyInput, T extends TInput> =
    PartialUndefinedKeys<{

        context?: ThisType<{
            config: WidgetContextConfig<WidgetType<Input>>
            props: ContextualRpcType<Input>['Props']
        }> & BaseWidgetContext<WidgetType<Input>> &
            BaseInputContext<T>;

        getContextClass: () => WidgetContextClass<Input>

        isGenericConfig: boolean
            | If<Not<Is<T['Config'], RpcGenericConfigFn>>, undefined>;

        props: T['Props']
            | If<Not<HasKeys<T['Props']>>, undefined>;

        /*
        inputOptions: {
            isGenericConfig
            props
            getContextClass
        }
         */

        controller: T['Controller']
            | If<Is<T['Controller'], NoRpc>, undefined>;

    }>


// DefaultProps<Is<T['Config'],Fn>, {isGenericConfig:boolean }, {}>

export function Input<T extends AnyInput>(options: InputOptions<T, InputType<T>>): T {

    const {
        props = {},
        controller = NoRpc,
        isGenericConfig = false,
        getContextClass
    } = <InputOptions<AnyInput, TInput>>options;

    return <T>Widget<AnyInput>({
        props,
        controller,
        getContextClass,
        isGenericConfig,
        handler: {
            check: async (context, data) => {
                const result = await context
                    .loadAndCheck(data)
                if ('error' in result)
                    return result.error
            },
        },
        connection: {
            check(data) {
                return this.handler(["check", data])
            }
        }
    })
}

