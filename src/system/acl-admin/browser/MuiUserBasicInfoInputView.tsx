import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import React from "react";
import styled from "styled-components";
import { MuiGrid } from "../../../browser/mui/components/MuiGrid";
import { InputViewFn } from "../../../typerpc/input/InputView";
import { UserBasicInfoInput } from "../../acl/common/UserBasicInfoInput";
import { MuiInputMapView } from "../../core/browser/MuiInputMapView";

export const UserAvatar = styled(Avatar)`
  width: 120px;
  height: 120px;
`;
export const MuiUserBasicInfoInputView: InputViewFn<
  typeof UserBasicInfoInput
> = props => {
  return (
    <>
      <MuiGrid
        item={{ xs: 12, sm: 12, md: 6 }}
        direction={"row-reverse"}
        spacing={3}
      >
        <MuiGrid
          direction={"column"}
          spacing={3}
          alignItems={"center"}
          alignContent={"center"}
        >
          <UserAvatar />
          <Button startIcon={<CloudUploadIcon />}>Upload</Button>
        </MuiGrid>
        <MuiInputMapView
          {...props}
          children={{
            firstName: {
              GridProps: {
                xs: 12,
                sm: 6,
                md: 6,
                lg: 4,
              },
            },
            lastName: {
              GridProps: {
                xs: 12,
                sm: 6,
                md: 6,
                lg: 4,
              },
            },
          }}
        />
      </MuiGrid>
    </>
  );
};
