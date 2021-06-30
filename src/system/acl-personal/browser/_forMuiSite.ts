import AclPersonalRouter from "@dabsi/system/acl-personal/view/AclPersonalRouter";
import MuiSiteUserMenu from "@dabsi/system/site/browser/MuiSiteUserMenu";

MuiSiteUserMenu.customActions.editBasicInfo = p => ({
  onAction: () => p.navigator.push(AclPersonalRouter, r => r.editProfile),
});
