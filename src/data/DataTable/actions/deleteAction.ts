import {Lang} from "../../../localization/Lang";
import {DataTableAction} from "../DataTable";

export const deleteAction: DataTableAction<any> = {
    icon: "delete",
    type: "single",
    danger: true,
    title: Lang`DELETE`,
    handle: async (keys, table) => {
        await table.props.source.deleteAll(keys);
        await table.reloadAfterRemove();
    }
}
