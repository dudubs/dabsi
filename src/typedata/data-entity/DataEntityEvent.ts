import { Union } from "@dabsi/common/typings2/Union";
import { EntityRelation } from "./../../typeorm/relations/EntityRelation";

export enum DataEntityEventType {
  RELATION_INSERTED,
  RELATION_UPDATED,
  RELATION_ADDED,
  RELATION_REMOVED,
  REMOVED,
  INSERTED,
  UPDATED,
}

export interface BaseDataEntityEvent {
  eventType: "inserted" | "updated" | "removed";
  entityType: Function;
  entityKey: object;
}

export interface BaseDataEntityRelationEvent {
  eventType:
    | "relation.updated"
    | "relation.inserted"
    | "relation.added"
    | "relation.removed";

  // if relation added | removed
  relationOn?: "insert" | "update";
  relation: EntityRelation;
  relationKey: object;
}

type BaseEvent<T> = Union<
  {
    [K in keyof T]: {
      eventType: T;
    } & T[K];
  }
>;
export type DataEntityEvent<T = {}> = any;
