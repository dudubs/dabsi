import { MuiFormView } from "@dabsi/browser/mui/form/MuiFormView";
import { MuiTextInputView } from "@dabsi/browser/mui/input/MuiTextInput";
import { AclRpc } from "@dabsi/system/acl/common/rpc";
import { AclStatsEvent } from "@dabsi/system/acl/view";
import { MuiTemplate } from "@dabsi/system/admin/browser/MuiTemplate";
import { SystemView } from "@dabsi/system/core/view/SystemView";
import { AnyForm } from "@dabsi/typerpc2/form/rpc";
import { AnyObjectInput } from "@dabsi/typerpc2/object-input/rpc";
import { ObjectInputView } from "@dabsi/typerpc2/object-input/view";
import { TextInput } from "@dabsi/typerpc2/text-input/rpc";
import { useEmittedState } from "@dabsi/view/react/reactor/useEmittedState";
import { ReactWrapper } from "@dabsi/view/react/ReactWrapper";

export default function MuiAdminWrapper({ children }) {
  const stats = useEmittedState(AclStatsEvent);

  if (!stats) return <>{lang`LOADING`}</>;
  if (stats.type === "guest") {
    return (
      <>
        hello guestx
        <ReactWrapper>
          {() => {
            return (
              <SystemView
                widget={AclRpc.instance.login}
                define={[
                  p => <></>,
                  {
                    input: {
                      password: {
                        //
                      },
                    },
                  },
                ]}
              />
            );
          }}
        </ReactWrapper>
      </>
    );
  }

  return <MuiTemplate title={lang`SYSTEM_ADMIN`}>{children}</MuiTemplate>;
}

// AClRpc.at("login.password")

SystemView.define(AclRpc, {
  login: {
    input: {
      password: {},
    },
  },
});

// login ... password

// SystemView

SystemView.define(TextInput, props => <MuiTextInputView {...props} />);

SystemView.define(AnyForm, props => (
  <MuiFormView {...props}>{props => <SystemView {...props} />}</MuiFormView>
));

SystemView.define(AnyObjectInput, props => (
  <ObjectInputView {...props}>
    {view =>
      Object.keys(view.element).map(childKeyy => (
        <SystemView {...view.getChildProps(childKeyy)} />
      ))
    }
  </ObjectInputView>
));
