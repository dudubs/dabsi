import MuiSection from "@dabsi/browser/mui/MuiSection";
import MuiSectionGroup from "@dabsi/browser/mui/MuiSectionGroup";
import { MuiDataTableView } from "@dabsi/browser/mui/views/MuiDataTableView";
import MuiFormView from "@dabsi/browser/mui/views/MuiFormView";
import AclAdminRpc from "@dabsi/system/acl/admin/common/AclRpc";
import { AclAdminRouter } from "@dabsi/system/acl/admin/view/router";
import { SystemView } from "@dabsi/system/core/view/SystemView";
import { RouterView } from "@dabsi/typerouter/view";
import mergeProps from "@dabsi/view/react/mergeProps";
import { useLoader } from "@dabsi/view/react/useLoader";
import { Breadcrumbs, Typography } from "@material-ui/core";
import React from "react";
import { MuiRouterLink } from "../../../../browser/mui/components/MuiRouterLink";

export default RouterView(AclAdminRouter, $ =>
  $.at("users", $ =>
    $.index(p => (
      <MuiDataTableView
        connection={AclAdminRpc.instance.usersTable}
        title={lang`AclUSERS`}
        onEditRow={(_, row) => p.navigator.push(p.root.editUser(row.$key))}
        onAddRow={() => p.navigator.push(p.root.addNewUser)}
      />
    ))
  )
    .at("addNewUser", $ =>
      $.index(p => (
        <MuiFormView connection={AclAdminRpc.instance.addNewUserForm} />
      ))
    )
    .at("editUser", $ =>
      $.index(({ useParams }) => {
        const connection = useParams(userId =>
          AclAdminRpc.instance.editUser(userId)
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
                <MuiRouterLink to={[AclAdminRouter, r => r.users]}>
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
