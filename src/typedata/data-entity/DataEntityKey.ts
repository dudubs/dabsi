import { EntityMetadata } from "typeorm";
import { mapArrayToObject } from "@dabsi/common/array/mapArrayToObject";
import { definedAt } from "@dabsi/common/object/definedAt";
import { KeyObject } from "@dabsi/typedata/KeyObject";
export type DataEntityKey = { object: object; text: string };

export namespace DataEntityKey {
  export function parseObject(
    metadata: EntityMetadata,
    text: string
  ): KeyObject {
    if (metadata.primaryColumns.length === 1) {
      return { [metadata.primaryColumns[0].propertyName]: text };
    } else {
      return pick(metadata, KeyObject.parse(text));
    }
  }
  export function parse(metadata: EntityMetadata, text: string): DataEntityKey;
  export function parse(
    metadata: EntityMetadata,
    text: string | null
  ): DataEntityKey | null;
  export function parse(metadata: EntityMetadata, text) {
    if (!text) return null;
    return { text, object: parseObject(metadata, text) };
  }

  export function stringify(metadata: EntityMetadata, keyObject: KeyObject) {
    if (metadata.primaryColumns.length === 1) {
      return String(keyObject[metadata.primaryColumns[0].propertyName]);
    } else {
      return KeyObject.stringify(keyObject);
    }
  }

  export function pick(metadata: EntityMetadata, entity: any): KeyObject {
    return mapArrayToObject(metadata.primaryColumns, column => [
      column.propertyName,
      definedAt(entity, column.propertyName),
    ]);
  }
}
