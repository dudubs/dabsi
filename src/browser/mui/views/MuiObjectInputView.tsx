import { mapObject } from "@dabsi/common/object/mapObject";
import { mapObjectToArray } from "@dabsi/common/object/mapObjectToArray";
import { SystemView } from "@dabsi/system/core/view/SystemView";
import { AnyInputMap } from "@dabsi/typerpc2/object-input/rpc";
import {
  ObjectInputView,
  ObjectInputViewProps,
} from "@dabsi/typerpc2/object-input/view";
import { Grid, GridProps } from "@material-ui/core";
import { entries } from "lodash";
import React from "react";

function sortObject<T>(
  o: any,
  firstKeys: (keyof T)[],
  lastKeys: (keyof T)[]
): any {
  if (!(lastKeys.length + firstKeys.length)) return o;
  const c: any = {};
  for (const k of firstKeys) {
    c[k] = o[k];
  }
  for (const [k, v] of entries(o)) {
    c[k] = v;
  }
  for (const k of lastKeys) {
    const v = c[k];
    delete c[k];
    c[k] = v;
  }
  return c;
}
export function MuiObjectInputView<T extends AnyInputMap>({
  container: ContainerGridProps,
  baseItem: BaseItemGridProps,
  item: ItemGridProps,
  firstItems,
  lastItems,
  ...props
}: ObjectInputViewProps<T> & {
  container?: GridProps;
  baseItem?: GridProps;
  item?: { [K in keyof T]?: GridProps };
  firstItems?: (keyof T)[];
  lastItems?: (keyof T)[];
}): React.ReactElement {
  return (
    <Grid direction="column" spacing={1} container {...ContainerGridProps}>
      <ObjectInputView {...props}>
        {view => {
          return mapObjectToArray(
            sortObject(view.element as any, firstItems || [], lastItems || []),
            (_, childKey) => (
              <Grid
                item
                {...BaseItemGridProps}
                {...ItemGridProps?.[childKey]}
                key={childKey}
              >
                <SystemView {...view.getChildProps(childKey)} />
              </Grid>
            )
          );
        }}
      </ObjectInputView>
    </Grid>
  );
}
