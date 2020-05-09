import {AnyDataTable, DataTable} from "./DataTable";

declare module "./DataTable" {
    interface DataTable<T, Fields, Props> {
        reloadAfterRemoveOrDelete: typeof reloadAfterRemoveOrDelete;
    }
}

DataTable.prototype.reloadAfterRemoveOrDelete = reloadAfterRemoveOrDelete;

async function reloadAfterRemoveOrDelete(this: AnyDataTable) {
    if (this.items.length === 1) {
        if (this.page === 0) {
            await this.reload();
        } else {
            this.page--;
        }
    } else {
        await this.reload();
    }
}
