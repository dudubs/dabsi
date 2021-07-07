import { UacCurrentUser } from "@dabsi/system/uac/common/UacCurrentUser";
import { UacLoginForm } from "@dabsi/system/uac/common/UacLoginForm";
import { UacRpc } from "@dabsi/system/uac/common/rpc";
import { UacCurrentUserReactor } from "@dabsi/system/uac/view";
import { FormView, FormViewProps } from "@dabsi/typerpc/form/view";
import mergeProps from "@dabsi/view/react/mergeProps";

export default (
  props: Partial<
    FormViewProps<UacLoginForm> & {
      onLogin?(user: UacCurrentUser, view: FormView<UacLoginForm>);
    }
  > = {}
) =>
  mergeProps(
    { ...props, connection: UacRpc.instance.loginForm },
    {
      onSubmit(result, view) {
        if (result.type === "success") {
          if (props.onLogin) {
            props.onLogin(result.user, view);
          } else {
            UacCurrentUserReactor.emit(result.user);
          }
        }
      },
    }
  );
