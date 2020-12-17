import Link, { LinkProps } from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import styled from "styled-components";
import { mergeProps } from "@dabsi/react/utils/mergeProps";

export type MuiLinkProps = LinkProps;

export const MuiLink = styled(Link)`
  cursor: pointer;
`;
