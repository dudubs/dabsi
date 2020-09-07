import {AbstractInputContext} from "../input/AbstractInputContext";
import {AnyInput, Input, InputCheckResult, InputType} from "../input/Input";
import {InputMap} from "../input/InputMap";
import {NoRpc} from "../NoRpc";
import {connectToRpc, RpcConfig, RpcConnection} from "../Rpc";
import {WidgetType} from "../widget/Widget";
import objectContaining = jasmine.objectContaining;

export function TestInput(
    {
        value = null,
        error = undefined,
        element = null,
        remoteConfig = null,
        controller = NoRpc,
        loadAndCheck,
        getElement,
    }: {
        value?, error?, element?, remoteConfig?, controller?, options?,
        loadAndCheck?,
        getElement?

    }) {
    return Input({
        props: {},
        controller,

        context:  class extends AbstractInputContext<any> {
            getControllerConfig(): RpcConfig<WidgetType<any>["Controller"]> {
                return remoteConfig;
            }

            async getElement(): Promise<WidgetType<any>["Element"]> {
                return getElement ? getElement() : element;
            }

            async loadAndCheck(data: InputType<any>["Data"]): Promise<InputCheckResult<AnyInput>> {
                if (loadAndCheck) {
                    return loadAndCheck(data)
                }
                return error ? {error} : {value};
            }

        }
    })

}


describe('InputMap', () => {
    it('expected to value', async () => {
        expect(await InputMap({
                hello: TestInput({
                    loadAndCheck: data => ({value: data.toUpperCase()})
                })
            }).getContext({hello: null}).loadAndCheck({hello: "world"})
        ).toEqual({value: {hello: "WORLD"}});
    });
    it('expected to error', async () => {
        expect(await  InputMap({
                hello: TestInput({
                    loadAndCheck: data => ({error: data.toUpperCase()})
                })
            })
                .getContext({hello: null})
                .loadAndCheck({hello: "world"})
        ).toEqual({error: {hello: "WORLD"}});
    });
    it('expected to element', async () => {
        expect(await  InputMap({
                hello: TestInput({
                    getElement: () => "world"
                })
            }).getContext({hello: null}).getElement()
        ).toEqual({hello: "world"});
    });
});


testm(__filename, () => {

    it('expected to valid check', async () => {
        await testCheck(() => null, null);
    });


    it('expected to validate data', async () => {
        await test({
            async load(config, data: string) {
                return data.toUpperCase()
            }
        }).check("hello");
    });

    it('expected to check value', async () => {
        await test({
            async check(config, value) {
                expect(value).toEqual("HELLO")
            },
            async load(config, text: string) {
                return text.toUpperCase()
            }
        }).check("hello");
    });

    async function testCheck(check, expected) {
        expect(await test({
            async check() {
                return check();
            }
        }).check(null)).toEqual(objectContaining(expected));

    }

    function test({config = null, ...props}): RpcConnection<AnyInput> {
        return connectToRpc(Input({
            props: {},
            controller: NoRpc,
            context:  class extends AbstractInputContext<any> {
                getControllerConfig(): RpcConfig<WidgetType<any>["Controller"]> {
                    return null;
                }

                async getElement(): Promise<WidgetType<any>["Element"]> {
                    return null;
                }

                async loadAndCheck(data: InputType<any>["Data"]): Promise<InputCheckResult<AnyInput>> {
                    return ({value: null});
                }

            },
            ...props
        }), config)
    }

});

