import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Avatar from "@material-ui/core/Avatar";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import MenuItem from "@material-ui/core/MenuItem";
import { useTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import UploadIcon from "@material-ui/icons/CloudUpload";

import React, { ReactNode, useState } from "react";
import styled from "styled-components";
import { MuiGrid } from "../../../browser/mui/components/MuiGrid";
import { MuiMenu } from "../../../browser/mui/components/MuiMenu";
import { MuiThemeProvider } from "../../../browser/mui/MuiSystem";
import { MuiFormViewTheme } from "../../../browser/mui/rpc/MuiFormViewTheme";
import { EmptyFragment } from "../../../react/utils/EmptyFragment";
import { ReactRouterView } from "../../../typerouter/ReactRouterView";
import { AclAdminRouter } from "../common";

const Title = styled(Typography)`
  font-weight: ${t => t.theme.typography.fontWeightMedium};
`;
const SubTitle = styled(Typography)`
  font-weight: ${t => t.theme.typography.fontWeightRegular};
`;

const SAvatar = styled(Avatar)`
  width: 120px;
  height: 120px;
`;

ReactRouterView(AclAdminRouter.at("dev").at("users").at("edit"), () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  console.log({ isSmall });
  const [expanded, setExpanded] = useState("groups");

  function accProps(name) {
    return {
      expanded: expanded === name,
      onChange: () => {
        console.log({ name });
        setExpanded(expanded === name ? "" : name);
      },
    };
  }

  return (
    <MuiThemeProvider theme={MuiFormViewTheme}>
      <MuiGrid direction={"column"} spacing={3}>
        <Grid container>
          <Grid item xs>
            <Title variant={"h6"}>David Ben Simon</Title>
            <Breadcrumbs>
              <Link href={"#"}>Acl</Link>
              <Link href={"#"}>Users</Link>
              <Link href={"#"}>David Ben Simon</Link>
            </Breadcrumbs>
          </Grid>
        </Grid>
        {/*<Divider style={{ marginTop: "24px", marginBottom: "24px" }} />*/}
        <div>
          {acc("binfo", "Basic Information", () => renderBasicInfo())}
          {acc("cinfo", "Contact Information", () => EmptyFragment)}
          {acc("groups", "Groups", () => renderGroups())}
          {acc("perms", "Perrmissions", () => EmptyFragment)}
        </div>
      </MuiGrid>
    </MuiThemeProvider>
  );

  function acc(name, title, render) {
    return (
      <Accordion {...accProps(name)}>
        <AccordionSummary>
          <Grid container>
            <Grid item xs>
              {name === expanded ? (
                <>
                  <Typography>{title}</Typography>
                </>
              ) : (
                <Grid container spacing={2} alignItems={"center"}>
                  <Grid xs={4}>
                    <Typography>{title}</Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography color={"textSecondary"}>
                      {title} description
                    </Typography>
                  </Grid>
                </Grid>
              )}
            </Grid>
            <Grid>
              {expanded === name ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>{render()}</AccordionDetails>
      </Accordion>
    );
  }

  function renderGroups() {
    const groups = ["Admins", "Subscriptions", "Reviewers"];

    return (
      <>
        <MuiGrid direction={"column"} spacing={3}>
          <MuiGrid item={{ xs: 3 }} direction={"row"}>
            {groups.map(name => (
              <Grid item xs={3} key={name}>
                <FormControlLabel label={name} control={<Checkbox />} />
              </Grid>
            ))}
          </MuiGrid>
          <Button variant={"contained"} color={"primary"}>
            Save changes
          </Button>
        </MuiGrid>
      </>
    );
  }

  function renderPermissions() {
    return <></>;
  }

  function renderBasicInfo() {
    const avater = (
      <MuiGrid
        direction={"column"}
        spacing={2}
        alignContent={"center"}
        alignItems={"center"}
      >
        <SAvatar></SAvatar>
        <Button
          variant={"contained"}
          color={"primary"}
          startIcon={<UploadIcon />}
        >
          Upload
        </Button>
      </MuiGrid>
    );

    const basicInfo = (
      <MuiGrid direction={"column"} spacing={2}>
        <div>
          <Grid container spacing={2}>
            <Grid item md={6} lg={4}>
              <TextField label={"First Name"} value={"David"} />
            </Grid>
            <Grid item md={6} lg={4}>
              <TextField label={"Last Name"} value={"Ben Simon"} />
            </Grid>
            <Grid item xs={12}>
              <TextField label={"Address"} value={""} />
            </Grid>
            <Grid item xs={12}>
              <TextField label={"Login Name"} value={"dudubs"} />
            </Grid>
          </Grid>
        </div>
        <Button variant={"contained"} color={"primary"}>
          Save changes
        </Button>
      </MuiGrid>
    );
    return (
      <MuiGrid
        item={{ md: 6, sm: 12 }}
        alignItems={"center"}
        spacing={3}
        direction={"row-reverse"}
      >
        {avater}
        {basicInfo}
      </MuiGrid>
    );
  }

  function renderInfo() {
    const contactInfo = (
      <MuiGrid direction={"column"} spacing={2} xl={6}>
        <SubTitle>Contact Info</SubTitle>
        <div>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField label={"Email"} value={"dudubs87@gmail.com"} />
            </Grid>
            <Grid item xs={12}>
              <TextField label={"Phone Number"} value={"054398958"} />
            </Grid>
          </Grid>
        </div>
        <Button variant={"contained"} color={"primary"}>
          Save changes
        </Button>
      </MuiGrid>
    );
    return (
      <MuiGrid item={{ xs: 12 }} spacing={3}>
        <Divider light />
        {contactInfo}
      </MuiGrid>
    );
  }
});
