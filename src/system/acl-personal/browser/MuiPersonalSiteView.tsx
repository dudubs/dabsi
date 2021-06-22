import MuiUserAreaView from "@dabsi/system/acl/admin/browser/MuiUserAreaView";
import MuiSiteWrapper from "@dabsi/system/site/browser/MuiSiteWrapper";

export default (p: { children: React.ReactElement }) => {
  return (
    <MuiSiteWrapper>
      <MuiUserAreaView>{p.children}</MuiUserAreaView>
    </MuiSiteWrapper>
  );
};
