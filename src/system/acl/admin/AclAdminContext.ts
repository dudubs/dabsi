import { DataRowContext } from "@dabsi/modules/data/DataRowContext";
import { DataUniqueChecker } from "@dabsi/modules/data/DataUniqueChecker";
import { DataContext } from "@dabsi/modules/DbModule";
import { Group } from "@dabsi/system/acl/entities/Group";
import { User } from "@dabsi/system/acl/entities/User";

export default {
  ...DataContext,
  checkUniqueUser: DataUniqueChecker(User),
  checkUniqueGroup: DataUniqueChecker(Group),

  user: DataRowContext(User),
  group: DataRowContext(Group),
} as const;
