import {MapFactory, WeakMapFactory} from "../common/map/mapFactory";
import {JSSchema, validateJSSchema, Validation} from "./JSONSchema";

export const buildFieldMetadataSymbol = Symbol();

declare global {


    interface Function {
        [buildFieldMetadataSymbol]?(metadata: FieldMetadata<any>,
                                    options: FieldOptions<any> | undefined,
                                    type: Function | undefined): void;
    }
}

export type FieldOptions<T> = {

    validate?(value: any): Validation;

    nullable?: boolean;

    primaryKey?: boolean;

    index?: string | boolean;

    schema?: JSSchema;

};

export class FieldMetadata<T = any> {

    constructor(
        public target: Function,
        public prop: string
    ) {
    }

    validators = Array<(value: T) => Validation>();

    createEmpty?(): any;

    clone?(value: T): T;

    configure(options: FieldOptions<any>) {
        const {schema} = options;
        schema && this.validators.push(value => validateJSSchema(schema, value));
    }

    validate(value): Validation {
        if (value === null) {
            // TODO
        }
        for (let validator of this.validators) {
            const result = validator(value);
            if (result)
                return result;
        }
    }
}

export type FieldMetadataBuilder = (metadata: FieldMetadata) => void;

export const getFieldMetadataBuilders = WeakMapFactory((target: Function) =>
    MapFactory((prop: string) => Array<FieldMetadataBuilder>()));

export const getFieldMetadata = WeakMapFactory((target: Function) => MapFactory((prop: string): FieldMetadata => {
        const metadata = new FieldMetadata(target, prop);
        for (const builder of getFieldMetadataBuilders.map.get(target)?.map.get(prop) || []) {
            builder(metadata);
        }
        return metadata;
    })
)


export function Field(type?: () => Function, options?: FieldOptions<any>): PropertyDecorator
export function Field(options: () => FieldOptions<any>): PropertyDecorator
export function Field(typeOrOptions?, maybeOptions?) {
    return (target: Function, prop) => {
        getFieldMetadataBuilders(target)(prop).push(
            (metadata: FieldMetadata) => {

                let type: Function | undefined = undefined;
                let options: FieldOptions<any> | undefined;

                if (typeof typeOrOptions === "function") {
                    type = typeOrOptions;
                    options = maybeOptions;
                } else {
                    options = typeOrOptions;
                }

                const designType = Reflect.getMetadata("design:type", target, prop);
                if (designType) {
                    designType[buildFieldMetadataSymbol]?.(metadata, options, type);
                } else {
                    type?.[buildFieldMetadataSymbol]?.(metadata, options, undefined);
                }
                options && metadata.configure(options);
            }
        );
    }
}


// Array[getFieldOptions]

