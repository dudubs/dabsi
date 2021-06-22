import RnpForm, { RnpFormProps } from "@dabsi/native/rnp/components/RnpForm";
import { SystemView } from "@dabsi/system/core/view/SystemView";
import { AnyForm } from "@dabsi/typerpc2/form/rpc";
import { FormView, FormViewProps } from "@dabsi/typerpc2/form/view";
import { Renderer } from "@dabsi/view/react/renderer";
import React from "react";

export default function RnpFormView<T extends AnyForm>({
  RnpFormProps,
  renderHeader,
  ...props
}: Omit<FormViewProps<T>, "children"> & {
  RnpFormProps?: Partial<RnpFormProps>;

  // renderWidget
  renderHeader?: (view: FormView<T>) => React.ReactElement | undefined;
}): React.ReactElement {
  // renderFormView

  return (
    <FormView {...props}>
      {(inputProps, form) => (
        <RnpForm
          {...RnpFormProps}
          header={renderHeader?.(form)}
          onSubmit={() => form.submit()}
          onReset={() => form.reset()}
        >
          <SystemView {...inputProps} />
        </RnpForm>
      )}
    </FormView>
  );
}
