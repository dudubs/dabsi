import { User } from "./../../../../system-old/server/acl/User";
import { DataRow } from "./../../../../typedata/DataRow";
import { RpcConfigResolver } from "../../../../typerpc/RpcConfigResolver";
import { AclUserBasicInfoForm } from "./BasicInfoForm";
import AclDataSources from "../../AclDataSources";

export const AclUserBasicInfoFormConfig = RpcConfigResolver(
  AclUserBasicInfoForm,
  {
    user: DataRow(User),
    sources: AclDataSources,
  },
  c => $ =>
    $({
      async submit(value) {
        await c.user.update(value);
      },
    })
);
