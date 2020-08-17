import {Validation} from "../../validators";
import {AnyFormField, FormError, FormField} from "../FormField";
import {connectToRpc, RpcConnectionOf} from "../Rpc";
import {Service} from "../Service";
import objectContaining = jasmine.objectContaining;

testm(__filename, () => {


    it('expected to invalid check', async () => {
        await testCheck(throws(() => new FormError(true)), {
            type: 'error', reason: true
        });
    });

    it('expected to valid check', async () => {
        await testCheck(() => null, {type: 'valid'});
    });

    it('check', async () => {
        await testCheck(throws(() => new FormError(true)), {
            type: 'error', reason: true
        });
        await testCheck(() => null, {type: 'valid'});
    });

    it('expected to load value', async () => {
        expect(await test({
            async load(config, text: string) {
                return text.toUpperCase()
            }
        }).load("hello")).toEqual("HELLO")
    });

    it('expected to validate data', async () => {
        await test({
            validate(config, data) {
                expect(data).toEqual("hello")
            },
            async load(config, text: string) {
                return text.toUpperCase()
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

    function test({config = null, ...options}): RpcConnectionOf<AnyFormField> {
        return connectToRpc(FormField({
            remote: Service({}),
            options: {},
            validate(data: any): Validation {
                return undefined
            },
            ...options
        }), config)
    }

});


function throws(getError) {
    return () => {
        throw  getError()
    }
}
