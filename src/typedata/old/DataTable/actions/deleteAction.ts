import { Lang } from "@dabsi/lang/Lang";
import { DataTableAction } from "@dabsi/typedata/old/DataTable/DataTable";

export const deleteAction: DataTableAction<any> = {
  icon: "delete",
  type: "single",
  danger: true,
  title: Lang`DELETE`,
  handleKeys: async (keys, table) => {
    await table.source.deleteAll(keys);
    // await table.reloadAfterRemove();
  },
};
