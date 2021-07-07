import { hasKeys } from "@dabsi/common/object/hasKeys";
import { DataFields } from "@dabsi/typedata/fields";
import { DataRelationKeys, DataRelationType } from "@dabsi/typedata/relation";
import { DataPickableKeys } from "@dabsi/typedata/selection/selection";
import { DataSelectedSource, DataSource } from "@dabsi/typedata/source/source";

declare global {
  namespace TypeData {
    interface IDataSource<T> {
      pick: typeof pickKeys &
        typeof pickKeysFromRelation &
        typeof pickKeysAndFields &
        typeof pickFields &
        typeof pickFieldsFromRelation;
    }
  }
}

declare function pickFieldsFromRelation<
  T,
  Relation extends DataRelationKeys<T>,
  F extends DataFields<DataRelationType<T[Relation]>>
>(
  this: DataSource<T>,
  relation: Relation,
  fields: F
): DataSelectedSource<
  T,
  { pick: readonly never[]; relations: Record<Relation, { fields: F }> }
>;

declare function pickKeysFromRelation<
  T,
  Relation extends DataRelationKeys<T>,
  K extends DataPickableKeys<DataRelationType<T[Relation]>>
>(
  this: DataSource<T>,
  relation: Relation,
  keys: readonly K[]
): DataSelectedSource<
  T,
  {
    relations: Record<Relation, { pick: K[] }>;
  }
>;

declare function pickKeysAndFieldsFromRelation<
  T,
  Relation extends DataRelationKeys<T>,
  K extends DataPickableKeys<DataRelationType<T[Relation]>>,
  F extends DataFields<DataRelationType<T[Relation]>>
>(
  this: DataSource<T>,
  relation: Relation,
  keys: readonly K[],
  fields: F
): DataSelectedSource<
  T,
  { relations: Record<Relation, { pick: K[]; fields: F }> }
>;

///
declare function pickFields<T, F extends DataFields<T>>(
  this: DataSource<T>,
  fields: F
): DataSelectedSource<T, { pick: readonly never[]; fields: F }>;

declare function pickKeys<T, K extends DataPickableKeys<T>>(
  this: DataSource<T>,
  keys: readonly K[]
): DataSelectedSource<T, { pick: K[] }>;

declare function pickKeysAndFields<
  T,
  K extends DataPickableKeys<T>,
  F extends DataFields<T>
>(
  this: DataSource<T>,
  keys: readonly K[],
  fields: F
): DataSelectedSource<T, { pick: K[]; fields: F }>;

DataSource.prototype.pick = <any>function (this: DataSource<any>, ...args) {
  let relation: string | null = null;
  let keys: string[] | null = null;
  let fields;

  let keysOrFields;
  let maybeFields;

  if (typeof args[0] === "string") {
    [relation, keysOrFields, maybeFields] = args;
  } else {
    [keysOrFields, maybeFields] = args;
  }

  if (Array.isArray(keysOrFields)) {
    [keys, fields] = [keysOrFields, maybeFields];
  } else {
    fields = keysOrFields;
  }

  if (!keys && !hasKeys(fields)) return this;

  let selection: any = { pick: keys, fields };
  if (relation) {
    selection = { relations: { [relation]: selection } };
  }
  return this.select(selection);
};
