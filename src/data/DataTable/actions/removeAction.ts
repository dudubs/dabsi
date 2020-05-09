import {Lang} from "../../../localization/Lang";
import {DataTableAction} from "../DataTable";

export const removeAction: DataTableAction<any, any> = {
    icon: "remove",
    type: "multiple",
    danger: true,
    title: Lang`REMOVE`,
    handle: async (keys, table) => {
        await table.props.source.removeAll(keys);
        await table.reloadAfterRemoveOrDelete();
    }
}
