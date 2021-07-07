import GoogleIcon from "@dabsi/system/acl-passport/strategies/google/browser/GoogleIcon";
import { MuiLoginButtons } from "@dabsi/system/acl/browser/MuiLoginFormView";
import { Button } from "@material-ui/core";
import React from "react";
import styled from "styled-components";

const StyledButton = styled(Button)`
  &&& {
    background-color: red;
    color: white;
  }
`;

MuiLoginButtons.push(() => {
  return (
    <StyledButton
      variant="contained"
      startIcon={<GoogleIcon />}
      onClick={() => {
        location.href =
          "/auth/google?back=" + encodeURIComponent(location.pathname);
      }}
    >{lang`LOGIN_WITH_GOOGLE`}</StyledButton>
  );
});
