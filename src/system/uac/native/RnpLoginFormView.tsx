import makeStyles from "@dabsi/native/rnp/makeStyles";
import RnpFormView from "@dabsi/native/rnp/views/RnpFormView";
import getLoginViewFormProps from "@dabsi/system/acl/view/getLoginViewFormProps";
import React from "react";
import { Text, TextStyle } from "react-native";

const T_LOGIN_SUCCESS = lang`LOGIN_SUCCESS_HELLO_${"name"}`;

const useStyles = makeStyles(theme => {
  const baseText: TextStyle = {
    fontSize: 20,
    textAlign: "center",
  };
  return {
    failed: {
      ...baseText,
      color: theme.colors.error,
    },
    success: {
      ...baseText,
      color: theme.colors.primary,
    },
  };
});

export default function (p: {}) {
  const styles = useStyles();

  return (
    <RnpFormView
      {...getLoginViewFormProps()}
      renderHeader={v => {
        switch (v.value?.type) {
          case "failed":
            return <Text style={styles.failed}>{lang`LOGIN_FAILED`}</Text>;

          case "success":
            return (
              <Text style={styles.success}>
                {T_LOGIN_SUCCESS({
                  name: v.value.user.displayName,
                })}
              </Text>
            );
        }
      }}
      RnpFormProps={{
        submitTitle: lang`LOGIN`,
        style: {
          padding: 10,
        },
      }}
    />
  );
}
