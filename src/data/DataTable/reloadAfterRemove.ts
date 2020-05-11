import {AnyDataTable, DataTable} from "./DataTable";

declare module "./DataTable" {
    interface DataTable<T, Props> {
        reloadAfterRemove: typeof reloadAfterRemove;
    }
}

DataTable.prototype.reloadAfterRemove = reloadAfterRemove;

async function reloadAfterRemove(this: AnyDataTable) {
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
