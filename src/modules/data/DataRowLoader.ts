import { entries } from "@dabsi/common/object/entries";
import { hasKeys } from "@dabsi/common/object/hasKeys";
import { AnyDataSelection } from "@dabsi/typedata/selection/selection";

export type DataRowLoader = (row: any) => any;

let counter = 0;

export function DataRowLoader(
  targetSel: AnyDataSelection,
  sourceSel: AnyDataSelection
): DataRowLoader {
  const loaders: ((raw: any, row: any) => void)[] = [];

  targetSel.pick =
    targetSel.pick && sourceSel.pick
      ? [...new Set([...targetSel.pick, ...sourceSel.pick])]
      : undefined;

  if (hasKeys(sourceSel.fields)) {
    const selKeyPrefix = `_fe_${++counter}_`;
    const targetFields = (targetSel.fields ||= {});
    for (const [fieldProp, exp] of entries(sourceSel.fields)) {
      const selProp = selKeyPrefix + fieldProp;
      targetFields[selProp] = exp;
      loaders.push((raw, row) => {
        row[fieldProp] = raw[selProp];
      });
    }
  }

  if (hasKeys(sourceSel.relations)) {
    const targetRelations = (targetSel.relations ||= {});
    for (const [relProp, sourceRelSel] of entries(sourceSel.relations)) {
      if (!sourceRelSel) continue;
      const targetRelSel = (targetRelations[relProp] ||= {
        pick: [],
      }) as AnyDataSelection;

      const relSelLoader = DataRowLoader(
        targetRelSel,
        typeof sourceRelSel === "boolean" ? {} : sourceRelSel
      );

      loaders.push((raw, row) => {
        const relRaw = raw[relProp];
        row[relProp] = Array.isArray(relRaw)
          ? relRaw.map(raw => relSelLoader(raw))
          : relSelLoader(relRaw);
      });
    }

    if (sourceSel.children) {
      throw new Error("no support yet.");
    }
  }
  return raw => {
    if (!raw) return;
    const row: any = Object.setPrototypeOf({}, raw);
    for (const load of loaders) {
      load(raw, row);
    }
    return row;
  };
}
