import { hasKeys } from "@dabsi/common/object/hasKeys";
import { DataFields } from "@dabsi/typedata/fields";
import { DataRelationKeys, DataRelationType } from "@dabsi/typedata/relation";
import { DataSelectionRow } from "@dabsi/typedata/selection/row";
import { DataPickableKeys } from "@dabsi/typedata/selection/selection";
import { DataSource } from "@dabsi/typedata/source/source";

const operator = "pick";

declare module "../source" {
  interface DataSource<T> {
    [operator]: typeof method;
  }
}

DataSource.prototype[operator] = method;

function method<
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

function method<
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

function method<
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
function method<T, Fields extends DataFields<T>>(
  this: DataSource<T>,
  fields: Fields
): DataSource<DataSelectionRow<T, { pick: readonly never[]; fields: Fields }>>;

function method<T, Keys extends DataPickableKeys<T>>(
  this: DataSource<T>,
  keys: readonly Keys[]
): DataSource<DataSelectionRow<T, { pick: Keys[] }>>;

function method<
  T,
  Keys extends DataPickableKeys<T>,
  Fields extends DataFields<T>
>(
  this: DataSource<T>,
  keys: readonly Keys[],
  fields: Fields
): DataSource<DataSelectionRow<T, { pick: Keys[]; fields: Fields }>>;

function method(this: DataSource<any>, ...args): any {
  let selection: any | null = null;
  let relation: string | null = null;
  if (typeof args[0] === "string") {
    [relation, ...args] = args;
  }
  let [keysOrFields, maybeFields] = args;
  let fields;
  let keys;

  if (maybeFields) {
    [keys, fields] = [keysOrFields, maybeFields];
  } else if (Array.isArray(keysOrFields)) {
    [keys, fields] = [keysOrFields, {}];
  } else {
    [keys, fields] = [[], keysOrFields];
  }

  if (!keys && !hasKeys(fields)) return this;

  selection = { pick: keys, fields };
  if (relation) {
    selection = { relations: { [relation]: selection } };
  }
  return this.select(selection);
}
