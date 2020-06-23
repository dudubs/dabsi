import {WeakMapFactory} from "../common/map/mapFactory";
import {Type} from "../common/typings";

export const asFieldMetadataBuilder = Symbol();

declare global {
    interface Function {
        [asFieldMetadataBuilder]?(fieldMetadata: FieldMetadata): FieldMetadata;
    }
}

export interface FieldOptions {


    default?(): any;

    nullable?: boolean;
}


const getStructMetadataBuilders = WeakMapFactory((
    structType: Type<any>
) => Array<(structMedata: StructMetadata) => void>());

type FieldMetadata<T = any> = {
    prop: string,
    structType: Type<any>,
    designType: Type<any> | undefined,

    type: Type<any> | undefined,

    validators: ((value: T) => void)[];

};

type StructMetadata = {
    structType: Type<any>,
    fields: FieldMetadata[];
    requiredFields: FieldMetadata[];
}

export const getStructMetadata = WeakMapFactory((structType: Type<any>) => {
        const baseStructType = Object.getPrototypeOf(structType);
        const baseMetadata = typeof baseStructType === "function" ?
            getStructMetadata(baseStructType) : undefined;


        const metadata: StructMetadata = {
            structType,
            fields: [...baseMetadata?.fields || []],
            requiredFields: [...baseMetadata?.requiredFields || []],
        }

        const builders = getStructMetadataBuilders(structType);

        for (const builder of builders) {
            builder(metadata);
        }

        return metadata;
    }
);


export class Struct {


}

type TypedPropertyDecorator<T> =
    <K extends PropertyKey>(target: Partial<Record<K, T>>, prop: K) => void;
export type FieldDecorator<T, O> = {
    (options?: O): TypedPropertyDecorator<T>;
    (type: undefined | (() => Type<any>), options?: O):
        TypedPropertyDecorator<T>;
};

export function FieldDecorator<T, O>
(buildFieldMetadata: (fieldMetadata: FieldMetadata) => void):
    FieldDecorator<T, O> {
    return (typeOrOptions, maybeOptions?) => {
        return ({constructor: structType}, prop) => {
            let getType;
            let options;
            if (typeof typeOrOptions === "function") {
                getType = typeOrOptions;
                options = maybeOptions ?? {};
            } else {
                getType = undefined;
                options = typeOrOptions ?? {};
            }
            getStructMetadataBuilders(structType).push(metadata => {

                let fieldMetadata: FieldMetadata = ({
                    prop,
                    structType,
                    designType: Reflect.getMetadata("design:type",
                        structType.prototype,
                        prop),
                    type: getType?.(),
                    validators: []
                })

                buildFieldMetadata(fieldMetadata);

                fieldMetadata.designType?.[asFieldMetadataBuilder]?.(fieldMetadata);

                metadata.fields.push(fieldMetadata);
            })
        }

    }
}


export const Field = FieldDecorator<any, FieldOptions>(md => md);

