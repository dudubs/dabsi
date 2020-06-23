import {entries} from "../common/object/entries";
import {ExtractKeys, Nullable, PartialKeys} from "../common/typings";

export type ArrayOptions = {
    length?: JSONNumberOptions;
    of?: JSONSchema
};

export type JSONAnySchema = "$or";
export type JSONArraySchema = "$array" | { $array: ArrayOptions };

export type OptionalSchema = { $optional: JSONSchema };

export type JSONProps = { [K in string]: JSONSchema | OptionalSchema };

export type JSONObjectSchema = "$object" | { $object: JSONProps };

export type JSONNumberOptions = {
    max?: number,
    min?: number,
}
export type JSONNumberSchema = "$number" | { $number: JSONNumberOptions }
export type JSONStringOptions = {
    length?: JSONNumberOptions,
    pattern?: RegExp
};
export  type JSONStringSchema = "$string" | { $string: JSONStringOptions } | RegExp;
export type JSONBooleanSchema = "$boolean";

export type NonNullableSchema = JSONStringSchema
    | JSONNumberSchema
    | JSONArraySchema
    | JSONObjectSchema
    | JSONBooleanSchema
    | JSONAnySchema;

export type JSONNullableSchema = { $nullable: NonNullableSchema };

export type JSONSchemaReference = { $schema: JSONNonSchemaReference };


export type JSONNonSchemaReference =
    NonNullableSchema | JSONNullableSchema;

export type JSONSchema =
    JSONNonSchemaReference | JSONSchemaReference;

export type JSONArraySchemaType<T extends JSONArraySchema> =
    T extends JSONArraySchema ? (
        T extends { $array: { of: JSONSchema } } ?
            JSONSchemaType<T['$array']['of']>[] :
            any[]
        ) : never;

export type OptionalSchemaType<T extends JSONSchema | OptionalSchema> =
    T extends JSONSchema ? JSONSchemaType<T> :
        T extends OptionalSchema ? JSONSchemaType<T['$optional']> : never;

export type JSONPropsType<T extends JSONProps> = PartialKeys<{
    [K in keyof T]: OptionalSchemaType<T[K]>
}, ExtractKeys<T, OptionalSchema>>;

export type JSONObjectSchemaType<T extends JSONObjectSchema> =
    T extends { $object: JSONProps } ? JSONPropsType<T['$object']> :
        T extends "$object" ? object : never;

export type JSONNonNullableSchemaType<T extends NonNullableSchema> =

    T extends JSONObjectSchema ? JSONObjectSchemaType<T> :
        T extends JSONAnySchema ? any :
            T extends JSONStringSchema ? string :
                T extends JSONNumberSchema ? number :
                    T extends JSONBooleanSchema ? boolean :
                        T extends JSONArraySchema ? JSONArraySchemaType<T> :
                            never;

export type JSONNonSchemaReferenceType<T extends JSONNonSchemaReference> =
    T extends NonNullableSchema ? JSONNonNullableSchemaType<T> :
        T extends JSONNullableSchema ? (JSONNonNullableSchemaType<T['$nullable']> | Nullable) :
            never;

export type JSONSchemaType<T extends JSONSchema> =
    T extends JSONNonSchemaReference ? JSONNonSchemaReferenceType<T> :
        T extends JSONSchemaReference ? (JSONNonSchemaReferenceType<T['$schema']>) :
            never;


export function JSONObject<T extends JSONProps>(schema: T): {
    $schema: T;
    new(props: JSONPropsType<T>): JSONPropsType<T>
} {
    (<any>JSONObject).$schema = schema;

    return <any>function JSONObject(props) {
        validateProps(schema, props)
        return props;
    }
}


export const $string = "$string";
export const $number = "$number";
export const $boolean = "$boolean";
export const $object = "$object";
export const $array = "$array";


export type Validation = undefined | (() => string);

export function validateNumber(
    options: JSONNumberOptions,
    value: number
): Validation {
    if ((typeof options.max === 'number') && (value > options.max)) {
        return () => `Expected less than ${options.max}`;
    }
    if ((typeof options.min === 'number') && (value < options.min)) {
        return () => `Expected greater than ${options.min}`;
    }
}

export function validatePattern(pattern: RegExp, value: string) {
    if (!pattern.test(value))
        return () => `Expected match to ${pattern}`
}

export function formatValidation(
    result: Validation,
    formatter: (reason: string) => string
): Validation {
    return result && (() => formatter(result()));
}

export function validateString(
    options: JSONStringOptions,
    value: string
): Validation {
    return (options.pattern && validatePattern(options.pattern, value))
        ?? (options.length && formatValidation(
                validateNumber(options.length, value.length),
                reason => `Invalid length because: ${reason}`)
        );
}

export function validateType(typeName: string, value: any) {
    if (typeof value !== typeName) {
        return () => `Expected ${typeName} in place ${typeof value}.`
    }
}

export function validateArray(options: ArrayOptions, value: any[]): Validation {
    const result = (options.length && validateNumber(options.length, value.length));

    if (result)
        return result;

    if (options.of) for (const [index, item] of value.entries()) {
        const result = validateJSONSchema(options.of, item);
        if (result)
            return formatValidation(result, reason => `Invalid #${index} because: ${reason}`)
    }
}

export function validateProps(props: JSONProps, value: object): Validation {
    return
}


export function validateJSONSchemaWithOptions(
    key: string,
    options: any,
    value: any
): Validation {
    switch (key) {
        case "$nullable":
            return value == null ? undefined : validateJSONSchema(options, value);
        case "$string":
            return validateJSONSchema("$string", value)
                ?? validateString(options, value);
        case "$number":
            return validateJSONSchema("$number", value)
                ?? validateNumber(options, value);
        case "$array":
            return validateJSONSchema("$array", value)
                ?? validateArray(options, value);
        case "$object":
            return validateJSONSchema("$object", value)
                ?? validateProps(options, value)
    }
    throw new Error(`Can't validate ${key}`)
}

export function validateJSONSchema(schema: JSONSchema, value: any): Validation {

    switch (typeof schema) {
        case "string":
            switch (schema) {
                case "$string":
                    return validateType("string", value);
                case "$number":
                    return validateType("number", value);
                case "$boolean":
                    return validateType("boolean", value);
                case "$or":
                    return undefined
                case "$array":
                    if (!Array.isArray(value))
                        return () => `Expected to array`
                    break;
                case "$object":
                    return validateType("object", value);
            }

            throw new Error(`Invalid schema type ${schema}`)

        case "object":
            const [[key, options]] = entries(schema as any);
            return validateJSONSchemaWithOptions(key, options, value);

    }
    throw new Error(`Can't validate ${JSON.stringify(schema)}`)

}

export function assertJSONSchema<T extends JSONSchema>(schame: T, value: any): asserts value is JSONSchemaType<T> {
    const result = validateJSONSchema(schame, value);
    if (result)
        throw new Error(result());
}

export function expectJSONSchema<T extends JSONSchema>(schame: T, value: any): asserts value is JSONSchemaType<T> {
    const result = validateJSONSchema(schame, value);
    if (result)
        fail(result());
}


type JSIsSchema<T> = { $is: (value) => value is T };
type JSAssertSchema<T> = { $assert: (value, reject: (msg: string) => void) => asserts value is T };

export type JSSchema = JSONSchema | JSIsSchema<any> | JSAssertSchema<any>;

export type JSSchemaType<T extends JSSchema> =
    T extends JSONSchema ? JSONSchemaType<T> :
        T extends JSIsSchema<infer U> ? U :
            T extends JSAssertSchema<infer U> ? U :
                never;

export function validateJSSchemaWithOptions(
    key: string,
    options: any,
    value: any
) {
    switch (key) {
        case "$is":
            if (!options(value)) {
                return () => `Invalid`
            }
            break;

        case "$assert":
            let msg;

            options(value, (_msg) => {
                msg = _msg;
            });
            if (msg)
                return () => msg;
            break;

        default:
            return validateJSONSchemaWithOptions(key, options, value);
    }
}

export function validateJSSchema(schema: JSSchema, value: any): Validation {
    if (typeof schema === "object") {
        const [[key, options]] = entries(schema as any);
        return validateJSSchemaWithOptions(key, options, value);
    }
    return validateJSONSchema(schema, value);
}

export type SchemaValidator<T> = (schema: T, value: any) => Validation;


export function assertSchema<T>(validator: SchemaValidator<T>,
                                schema: T,
                                value: any) {
    const result = validator(schema, value);
    if (result)
        throw new Error(result());
}

export function isSchema<T>(validator: SchemaValidator<T>,
                            schema: T,
                            value: any): boolean {
    return !validator(schema, value);
}

export function expectSchema<T>(validator: SchemaValidator<T>,
                                schema: T,
                                value: any) {
    const result = validator(schema, value);
    if (result)
        fail(result());
}

export type Schema<S, T> = {
    new(value: T): T;

    $schema: S;

    validator: SchemaValidator<T>;
    assert(value: any): asserts value is T;
    is(value: any): value is T;
};

export function createSchema<S>(validator: SchemaValidator<S>,
                                schema: S): Schema<S, any> {


    Schema.$schema = schema;
    Schema.validator = validator;
    Schema.is = value => isSchema(validator, schema, value);
    Schema.assert = value => assertSchema(validator, schema, value);

    return <any>Schema;

    function Schema(value) {
        assertSchema(validator, schema, value);
        return value;
    }

}


export function JSONSchema<S extends JSONSchema>(schema: S):
    Schema<S, JSONSchemaType<S>> {
    return createSchema<S>(validateJSONSchema, schema)
}

export function JSSchema<S extends JSSchema>(schema: S):
    Schema<S, JSSchemaType<S>> {
    return createSchema<S>(validateJSSchema, schema)
}



export function $is<T>(callback: (value: any) => boolean): { $is: (value: any) => value is T } {
    return {$is: <any>callback}
}

export function $assert<T>(callback: (value: any) => string | undefined): JSAssertSchema<T> {
    return {
        $assert: (value, reject) => {
            const result = callback(value);
            if (typeof result === "string") {
                reject(result);
            }
        }
    }
}



