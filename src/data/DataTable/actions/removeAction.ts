import {Lang} from "../../../localization/Lang";
import {DataTableAction} from "../DataTable";

export const removeAction: DataTableAction<any> = {
    icon: "remove",
    type: "multiple",
    danger: true,
    title: Lang`REMOVE`,
    handleKeys: async (keys, table) => {
        await table.source.remove(keys);
        await table.reloadAfterRemove();
    }
}
