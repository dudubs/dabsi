import RnGrid from "@dabsi/native/RnGrid";
import { SystemView } from "@dabsi/system/core/view/SystemView";
import { AnyInput } from "@dabsi/typerpc/input/Input";
import {
  ObjectInputView,
  ObjectInputViewProps,
} from "@dabsi/typerpc/object-input/view";
import React from "react";

export default function RnpObjectInputView<T extends Record<string, AnyInput>>(
  props: ObjectInputViewProps<T>
): React.ReactElement {
  return (
    <RnGrid container noIndex spacing={2} direction="column" itemGrow={1}>
      <ObjectInputView {...props}>
        {props => (
          <RnGrid item key={props.childKey} index={props.index}>
            <SystemView {...props} />
          </RnGrid>
        )}
      </ObjectInputView>
    </RnGrid>
  );
}
