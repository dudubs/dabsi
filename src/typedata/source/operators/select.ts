import { DataRelationKeys } from "@dabsi/typedata/relation";
import { DataSelectionRow } from "@dabsi/typedata/selection/row";
import {
  AnyDataSelection,
  DataSelection,
} from "@dabsi/typedata/selection/selection";
import { DataSource } from "@dabsi/typedata/source/source";

const operator = "select";

declare module "../source" {
  interface DataSource<T> {
    [operator]: typeof method;
  }
}

DataSource.prototype[operator] = method;

function method<T, Selection extends DataSelection<T> = {}>(
  this: DataSource<T>,
  selection: Selection | undefined
): DataSource<DataSelectionRow<T, Selection>>;

function method<
  T,
  Relation extends DataRelationKeys<T>,
  RelationSelection extends DataSelection.Relations<T>[Relation] = true
>(
  this: DataSource<T>,
  relation: Relation,
  selection: RelationSelection | undefined
): DataSource<
  DataSelectionRow<
    T,
    {
      relations: Record<Relation, RelationSelection>;
    }
  >
>;

function method(this: DataSource<any>, ...args): any {
  let selection: AnyDataSelection | null = null;

  if (args.length === 1) {
    [selection] = args;
  } else if (args.length === 2) {
    const [relation, relationSelection] = args;
    if (!relationSelection) return this;
    selection = {
      relations: { [relation]: relationSelection },
    };
  }
  if (!selection) return this;
  return this.updateCursor({
    selection: DataSelection.merge(this.cursor.selection, selection),
  });
}
