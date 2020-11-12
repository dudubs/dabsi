import { Lang } from "../../../../lang/Lang";
import { DataTableAction } from "../DataTable";

export const removeAction: DataTableAction<any> = {
  icon: "remove",
  type: "multiple",
  danger: true,
  title: Lang`REMOVE`,
  handleKeys: async (keys, table) => {
    await table.source.removeAll(keys);
    // await table.reloadAfterRemove();
  },
};
