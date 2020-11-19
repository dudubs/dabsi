import Typography from "@material-ui/core/Typography";
import React from "react";
import { MuiCheckboxInputView } from "../../browser/mui/rpc/inputs/MuiCheckboxInputView";
import { MuiDataManagerView } from "../../browser/mui/rpc/MuiDataManagerView";
import { MuiFormView } from "../../browser/mui/rpc/MuiFormView";
import { Lang } from "../../lang/Lang";
import { DataInputMapView } from "../../typerpc/input/data-input-map/DataInputMapView";
import { InputMapView } from "../../typerpc/input/input-map/InputMapView";
import {
  AclUsersManager,
  AclUsersManagerRouter,
} from "../common/AclUsersManager";
import { MuiUserBasicInfoInputView } from "./MuiUserBasicInfoInputView";
import { MuiUserContactInfoInputView } from "./MuiUserContactInfoInputView";

// MuiAclManagerView

export function MuiAclUsersManagerView(router: typeof AclUsersManagerRouter) {
  MuiDataManagerView({
    router,
    connection: AclUsersManager.service,
    editTabs: {
      groups: props => (
        <MuiFormView
          {...props} //
          // submitOnChange
          onSubmit={() => {
            // emit( new Alert({
            //
            //  message: Lang`SAVE_COMPLETE`,
            //  options: {}
            //
            // }) )
          }}
          input={props => {
            return (
              <DataInputMapView
                {...props}
                target={({ props, row }) => (
                  <MuiCheckboxInputView {...props} title={row.label} />
                )}
                renderNoKeys={() => <Typography>{Lang`NO_GROUPS`}</Typography>}
              />
            );
          }}
        />
      ),
    },

    renderAddInput: props => <MuiUserBasicInfoInputView {...props} />,
    renderEditInput: props => (
      <InputMapView.Fields
        {...props}
        fields={{
          basicInfo: props => <MuiUserBasicInfoInputView {...props} />,
          contactInfo: props => <MuiUserContactInfoInputView {...props} />,
        }}
      />
    ),
  });
}
