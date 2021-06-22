import { RnpTextInput, RnpTextInputProps } from "@dabsi/native/rnp";
import { TextInput } from "@dabsi/typerpc2/text-input/rpc";
import {
  TextInputView,
  TextInputViewProps,
} from "@dabsi/typerpc2/text-input/view";
import LangKey from "@dabsi/view/lang/LangKey";
import useLangService from "@dabsi/view/lang/useLangService";
import mergeProps from "@dabsi/view/react/mergeProps";
import React from "react";
import { View } from "react-native";
import { HelperText } from "react-native-paper";

export default function RnpTextInputView<T extends TextInput>(
  p: TextInputViewProps<T> & {
    label?: React.ReactNode;
    RnpTextInputProps?: RnpTextInputProps;
  }
): React.ReactElement {
  const langs = useLangService();

  return (
    <TextInputView {...p}>
      {v => (
        <>
          <RnpTextInput
            {...mergeProps(p.RnpTextInputProps, {
              label: {
                $default:
                  langs.translateNode(
                    <LangKey for={p.childKey}>{p.label}</LangKey>
                  ) || undefined,
              },
              onChangeText: text => {
                v.setText(text);
              },
            })}
            value={v.text}
            error={Boolean(v.error)}
          />
          {v.errorElement && (
            <HelperText type="error">{v.errorElement}</HelperText>
          )}
        </>
      )}
    </TextInputView>
  );
}
