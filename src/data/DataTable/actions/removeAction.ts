import {Lang} from "../../../localization/Lang";
import {DataTableAction} from "../DataTable";

export const removeAction: DataTableAction<any> = {
    icon: "remove",
    type: "multiple",
    danger: true,
    title: Lang`REMOVE`,
    handle: async (keys, table) => {
        await table.props.source.remove(keys);
        await table.reloadAfterRemove();
    }
}
