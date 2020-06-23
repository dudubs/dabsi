import {assertJSONSchema, JSONSchema, JSONSchemaType} from "../JSONSchema";


fit('primitive', () => {

    assert("$string", "hello", 123);
    assert("$number", 123, "hello");
    assert("$boolean", false, "hello");

    function assert<T extends JSONSchema>(schema: T, value: JSONSchemaType<T>, notValue: any) {
        expect(() => assertJSONSchema(schema, value)).not.toThrow();
        expect(() => assertJSONSchema(schema, notValue)).toThrow();
    }

    /*

    assertJSSchema({
        $is() {

        }

        $because: {
            reason: "XXXASDSD",
            schema: {$is() {

            }}
        }
    })

     */

})
