import MuiSection from "@dabsi/browser/mui/MuiSection";
import MuiSectionGroup from "@dabsi/browser/mui/MuiSectionGroup";
import { MuiDataTableView } from "@dabsi/browser/mui/views/MuiDataTableView";
import { MuiFormView } from "@dabsi/browser/mui/views/MuiFormView";
import ACL_AdminRpc from "@dabsi/system/acl/admin/common/rpc";
import { ACL_AdminRouter } from "@dabsi/system/acl/admin/view/router";
import { SystemView } from "@dabsi/system/core/view/SystemView";
import { RouterView } from "@dabsi/typerouter2/view";
import { mergeProps } from "@dabsi/view/react/merging";
import { useLoader } from "@dabsi/view/react/useLoader";
import { Breadcrumbs, Typography } from "@material-ui/core";
import React from "react";
import { MuiRouterLink } from "../../../../browser/mui/components/MuiRouterLink";

export default RouterView(ACL_AdminRouter, $ =>
  $.at("users", $ =>
    $.index(({ root, history }) => (
      <MuiDataTableView
        connection={ACL_AdminRpc.instance.usersTable}
        title={lang`ACL_USERS`}
        onEditRow={(_, row) => history.push(root.editUser(row.$key))}
        onAddRow={() => history.push(root.addNewUser)}
      />
    ))
  )
    .at("addNewUser", $ =>
      $.index(({ root, history }) => (
        <MuiFormView connection={ACL_AdminRpc.instance.addNewUserForm} />
      ))
    )
    .at("editUser", $ =>
      $.index(({ useParams }) => {
        const connection = useParams(userId =>
          ACL_AdminRpc.instance.editUser(userId)
        );

        const [basicInfo, setBasicInfo] = useLoader(
          () => connection.getBasicInfo(),
          [connection]
        );

        return (
          <MuiSectionGroup
            header={
              <Breadcrumbs>
                <Typography>{lang`ACL`}</Typography>
                <MuiRouterLink to={[ACL_AdminRouter, r => r.users]}>
                  {lang`USERS`}
                </MuiRouterLink>

                <Typography>
                  {lang`EDIT_USER`}
                  {basicInfo ? `: ${basicInfo.loginName}` : null}
                </Typography>
              </Breadcrumbs>
            }
          >
            <MuiSection title={lang`USER_BASIC_INFO`}>
              <SystemView
                connection={connection.basicForm}
                build={$ =>
                  $.at("input.loginName", $ =>
                    $.withProps(props =>
                      mergeProps(props, {
                        onInputValue: view => {
                          setBasicInfo({
                            ...basicInfo,
                            loginName: view.value || "",
                          });
                        },
                      })
                    )
                  )
                }
              >
                {props => <MuiFormView {...props} variant="save" />}
              </SystemView>
            </MuiSection>
            <MuiSection title={lang`USER_CONTACT_INFO`}>
              <MuiFormView variant="save" connection={connection.contactForm} />
            </MuiSection>
          </MuiSectionGroup>
        );
      })
    )
);
