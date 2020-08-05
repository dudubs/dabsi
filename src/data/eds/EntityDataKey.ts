import {EntityMetadata} from "typeorm";
import {definedAt} from "../../common/object/definedAt";
import {KeyObject} from "../KeyObject";

export namespace EntityDataKey {
    export function parse(
        metadata: EntityMetadata,
        text: string
    ): KeyObject {
        if (metadata.primaryColumns.length === 1) {
            return {[metadata.primaryColumns[0].propertyName]: text}
        } else {
            return fromEntity(
                metadata,
                KeyObject.parse(text)
            )
        }
    }

    export function stringify(
        metadata: EntityMetadata,
        keyObject: KeyObject
    ) {
        if (metadata.primaryColumns.length === 1) {
            return String(keyObject[metadata.primaryColumns[0].propertyName])
        } else {
            return KeyObject.stringify(keyObject)
        }
    }

    export function fromEntity(
        metadata: EntityMetadata,
        entity: any): KeyObject {
        return metadata.primaryColumns.toObject(
            column => [column.propertyName,
                definedAt(entity, column.propertyName)]
        )
    }


    // export function load(
    //     metadata: EntityMetadata,
    //     keyPropertyNameToAliasName: Record<string, string>,
    //     selector: QueryBuilderSelector,
    //     raw: Record<string, any>,
    // ): string {
    //     if (metadata.primaryColumns.length === 1) {
    //         const [column] = metadata.primaryColumns;
    //         return String(
    //             selector.load(raw,
    //                 keyPropertyNameToAliasName[column.propertyName]
    //             )
    //         )
    //     } else {
    //         return KeyObject.stringify(
    //             mapObject(keyPropertyNameToAliasName, aliasName =>
    //                 selector.load(
    //                     raw,
    //                     keyPropertyNameToAliasName[aliasName]
    //                 )
    //             )
    //         )
    //     }
    // }
    //
    // export function select(
    //     metadata: EntityMetadata,
    //     selector: QueryBuilderSelector,
    //     schema: string
    // ): (raw: object) => string {
    //     const keyAliasNamePrefix = schema + '__key_';
    //     const keyPropertyNameToAliasName: Record<string, string> = {};
    //     for (const column of metadata.primaryColumns) {
    //         const keyAliasName = keyAliasNamePrefix + column.propertyName;
    //         keyPropertyNameToAliasName[column.propertyName] = keyAliasName;
    //         selector.select(column.databaseName, keyAliasName, schema)
    //     }
    //
    //     return raw => load(
    //         metadata,
    //         keyPropertyNameToAliasName,
    //         selector,
    //         raw
    //     )
    // }

}
