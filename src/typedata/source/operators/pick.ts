import { hasKeys } from "@dabsi/common/object/hasKeys";
import { DataFields } from "@dabsi/typedata/fields";
import { DataRelationKeys, DataRelationType } from "@dabsi/typedata/relation";
import { DataSelectionRow } from "@dabsi/typedata/selection/row";
import { DataPickableKeys } from "@dabsi/typedata/selection/selection";
import { DataSource } from "@dabsi/typedata/source/source";

declare module "../source" {
  interface DataSource<T> {
    pick: typeof pickKeys &
      typeof pickKeysFromRelation &
      typeof pickKeysAndFields &
      typeof pickFields &
      typeof pickFieldsFromRelation;
  }
}

declare function pickFieldsFromRelation<
  T,
  Relation extends DataRelationKeys<T>,
  Fields extends DataFields<DataRelationType<T[Relation]>>
>(
  this: DataSource<T>,
  relation: Relation,
  fields: Fields
): DataSource<
  DataSelectionRow<
    T,
    { pick: readonly never[]; relations: Record<Relation, { fields: Fields }> }
  >
>;

declare function pickKeysFromRelation<
  T,
  Relation extends DataRelationKeys<T>,
  Keys extends DataPickableKeys<DataRelationType<T[Relation]>>
>(
  this: DataSource<T>,
  relation: Relation,
  keys: readonly Keys[]
): DataSource<
  DataSelectionRow<
    T,
    {
      relations: Record<Relation, { pick: Keys[] }>;
    }
  >
>;

declare function pickKeysAndFieldsFromRelation<
  T,
  Relation extends DataRelationKeys<T>,
  Keys extends DataPickableKeys<DataRelationType<T[Relation]>>,
  Fields extends DataFields<DataRelationType<T[Relation]>>
>(
  this: DataSource<T>,
  relation: Relation,
  keys: readonly Keys[],
  fields: Fields
): DataSource<
  DataSelectionRow<
    T,
    { relations: Record<Relation, { pick: Keys[]; fields: Fields }> }
  >
>;

///
declare function pickFields<T, Fields extends DataFields<T>>(
  this: DataSource<T>,
  fields: Fields
): DataSource<DataSelectionRow<T, { pick: readonly never[]; fields: Fields }>>;

declare function pickKeys<T, Keys extends DataPickableKeys<T>>(
  this: DataSource<T>,
  keys: readonly Keys[]
): DataSource<DataSelectionRow<T, { pick: Keys[] }>>;

declare function pickKeysAndFields<
  T,
  Keys extends DataPickableKeys<T>,
  Fields extends DataFields<T>
>(
  this: DataSource<T>,
  keys: readonly Keys[],
  fields: Fields
): DataSource<DataSelectionRow<T, { pick: Keys[]; fields: Fields }>>;

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
