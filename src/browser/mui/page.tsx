import MuiGrid from "@dabsi/browser/mui/components/MuiGrid";
import Typography from "@material-ui/core/Typography";
import React, { ComponentType } from "react";

//
export function MuiPage({
  title,
  children,
  breadcrumbTitle = title,
  Breadcrumbs = undefined as undefined | ComponentType,
}) {
  return (
    <MuiGrid spacing={3} direction="column">
      <MuiGrid direction="column" spacing={1}>
        <Typography variant="h5">{title}</Typography>

        {Breadcrumbs && (
          <Breadcrumbs>
            <Typography>{breadcrumbTitle}</Typography>
          </Breadcrumbs>
        )}
      </MuiGrid>
      <div>{children}</div>
    </MuiGrid>
  );
}
