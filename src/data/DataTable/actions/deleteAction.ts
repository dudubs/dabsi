import {Lang} from "../../../localization/Lang";
import {DataTableAction} from "../DataTable";

export const deleteAction: DataTableAction<any> = {
    icon: "delete",
    type: "single",
    danger: true,
    title: Lang`DELETE`,
    handleKeys: async (keys, table) => {
        await table.source.delete(keys);
        await table.reloadAfterRemove();
    }
}
