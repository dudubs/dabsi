import {AnyFormField, FormField} from "../FormField";
import {NoRpc} from "../NoRpc";
import {connectToRpc, RpcConnectionType} from "../Rpc";
import objectContaining = jasmine.objectContaining;

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

    function test({config = null, ...props}): RpcConnectionType<AnyFormField> {
        return connectToRpc( FormField({
            remote: NoRpc,
            options: {},
            getRemoteConfig: () => null,
            load: () => null,
            getElement: () => null,
            check: () => null,
            ...props
        }), config)
    }

});


function throws(getError) {
    return () => {
        throw  getError()
    }
}
