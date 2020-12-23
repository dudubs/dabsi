import Paper, { PaperProps } from "@material-ui/core/Paper";
import Typography, { TypographyProps } from "@material-ui/core/Typography";
import { ReactNode } from "react";
import React from "react";
import styled from "styled-components";
import { Override } from "@dabsi/common/typings2/Override";
import BoxInCenter from "@dabsi/system/acl/browser/BoxInCenter";

const StyledPaper = styled(Paper)`
  padding: ${t => t.theme.spacing(1)}px;
`;
export const PaperInCenter = ({
  title,
  children,
  TitleTypographyProps,
  ...props
}: Override<
  PaperProps,
  {
    title?: ReactNode;
    TitleTypographyProps?: TypographyProps;
  }
>) => (
  <BoxInCenter>
    <StyledPaper {...props}>
      {title && (
        <Typography variant={"h6"} {...TitleTypographyProps}>
          {title}
        </Typography>
      )}
      {children}
    </StyledPaper>
  </BoxInCenter>
);
