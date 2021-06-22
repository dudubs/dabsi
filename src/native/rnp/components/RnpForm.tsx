import RnGrid from "@dabsi/native/RnGrid";
import { RnpButton, RnpButtonProps } from "@dabsi/native/rnp";
import LangToken from "@dabsi/view/lang/LangToken";
import React from "react";
import { ViewStyle } from "react-native";

export type RnpFormProps = {
  children: React.ReactElement;
  onSubmit?(): void;
  onCancel?(): void;
  onReset?(): void;

  ButtonProps?: Partial<RnpButtonProps>;
  CancelButtonProps?: Partial<RnpButtonProps>;
  ResetButtonProps?: Partial<RnpButtonProps>;
  SubmitButtonProps?: Partial<RnpButtonProps>;

  submitTitle?: React.ReactNode;
  resetTitle?: React.ReactNode;
  cancelTitle?: React.ReactNode;

  style?: ViewStyle;
  header?: React.ReactElement;
};

const buttonTypes = ["Reset", "Cancel", "Submit"].map(buttonType => {
  const lowerType = buttonType.toLowerCase();
  const upperType = buttonType.toUpperCase();
  const titleProp = lowerType + "Title";
  return {
    type: buttonType,
    titleProp,
    upperType,
    propsProp: buttonType + "ButtonProps",
    callbackProp: "on" + buttonType,
  };
});

export default function RnpForm(p: RnpFormProps): React.ReactElement {
  return (
    <RnGrid container direction="column" spacing={2} style={p.style}>
      {p.header && <RnGrid item>{p.header}</RnGrid>}
      <RnGrid item>{p.children}</RnGrid>
      <RnGrid item container direction="row" justifyContent="center">
        {buttonTypes.map(b => {
          const callback = p[b.callbackProp];
          return (
            p[b.callbackProp] && (
              <RnGrid item key={b.type}>
                <RnpButton
                  {...p.ButtonProps}
                  {...p[b.propsProp]}
                  onPress={() => callback()}
                >
                  {p[b.titleProp] ?? <LangToken>{b.upperType}</LangToken>}
                </RnpButton>
              </RnGrid>
            )
          );
        })}
      </RnGrid>
    </RnGrid>
  );
}
