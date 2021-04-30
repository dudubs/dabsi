import { MuiTemplate } from "@dabsi/system/admin/browser/MuiTemplate";

export default function MuiAdminWrapper({ children }) {
  return <MuiTemplate title={lang`SYSTEM_ADMIN`}>{children}</MuiTemplate>;
}
