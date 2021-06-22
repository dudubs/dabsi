import { AclCurrentUser } from "@dabsi/system/acl/common/AclCurrentUser";
import { AclLoginForm } from "@dabsi/system/acl/common/AclLoginForm";
import { AclRpc } from "@dabsi/system/acl/common/rpc";
import { AclCurrentUserReactor } from "@dabsi/system/acl/view";
import { FormView, FormViewProps } from "@dabsi/typerpc2/form/view";
import mergeProps from "@dabsi/view/react/mergeProps";

export default (
  props: Partial<
    FormViewProps<AclLoginForm> & {
      onLogin?(user: AclCurrentUser, view: FormView<AclLoginForm>);
    }
  > = {}
) =>
  mergeProps(
    { ...props, connection: AclRpc.instance.loginForm },
    {
      onSubmit(result, view) {
        if (result.type === "success") {
          if (props.onLogin) {
            props.onLogin(result.user, view);
          } else {
            AclCurrentUserReactor.emit(result.user);
          }
        }
      },
    }
  );
