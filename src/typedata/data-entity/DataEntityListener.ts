import { Awaitable } from "@dabsi/common/typings2/Async";
import { RelationMetadata } from "typeorm/metadata/RelationMetadata";

export enum DataChangeReason {
  INSERT,
  UPDATE,
  DELETE,
}
export type DataRelationMetadataChange = {
  relationMetadata: RelationMetadata;
  newRelationKey: string | null;
  oldRelationKey: string | null;
  reason: DataChangeReason;
  entityKey: string;
};

export type DataRelationChange = {
  relationMetadata: RelationMetadata;
  newRelationKey: string | null;
  oldRelationKey: string | null;
  reason: DataChangeReason;
  entityKey: string;
};

export interface DataEntityListener {
  emitRelationChange?(change: DataRelationChange): Awaitable;
  hasRelationListener(relationMetadata: RelationMetadata): boolean;
}
