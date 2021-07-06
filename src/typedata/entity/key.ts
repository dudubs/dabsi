import { mapArrayToObject } from "@dabsi/common/array/mapArrayToObject";
import defined from "@dabsi/common/object/defined";
import { definedAt } from "@dabsi/common/object/definedAt";
import { EntityMetadata } from "typeorm";

export type DataEntityKey = { object: Record<string, any>; text: string };

export namespace DataEntityKey {
  export function encodeArgs(args: any[]) {
    return args.map(arg => encodeURIComponent(arg)).join(":");
  }

  export function decodeArgs(text: string) {
    return text.split(":").map(text => decodeURIComponent(text));
  }

  export function parseObject(
    metadata: EntityMetadata,
    text: string
  ): Record<string, any> {
    if (metadata.primaryColumns.length === 1) {
      return { [metadata.primaryColumns[0].propertyName]: text };
    } else {
      const args = decodeArgs(text);
      return mapArrayToObject(metadata.primaryColumns, (column, index) => [
        column.propertyName,
        defined(args[index], `No ${column.propertyName}`),
      ]);
    }
  }
  export function parse(metadata: EntityMetadata, text: string): DataEntityKey;

  export function parse(
    metadata: EntityMetadata,
    text: string | null
  ): DataEntityKey | null;

  export function parse(metadata: EntityMetadata, text) {
    if (!text) return null;
    return {
      text,
      object: parseObject(metadata, text),
    };
  }

  export function stringify(
    metadata: EntityMetadata,
    keyObject: Record<string, any>
  ) {
    if (metadata.primaryColumns.length === 1) {
      return String(keyObject[metadata.primaryColumns[0].propertyName]);
    } else {
      return encodeArgs(
        metadata.primaryColumns.map(column => keyObject[column.propertyName])
      );
    }
  }

  export function pick(
    metadata: EntityMetadata,
    entity: any
  ): Record<string, any> {
    return mapArrayToObject(metadata.primaryColumns, column => [
      column.propertyName,
      definedAt(entity, column.propertyName),
    ]);
  }
}
