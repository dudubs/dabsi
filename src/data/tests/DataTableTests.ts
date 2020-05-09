import * as React from "react";
import {createElement, Fragment} from "react";
import * as TestRenderer from "react-test-renderer";
import {Group} from "../../acl/Group";
import {User} from "../../acl/User";
import {Timeout} from "../../common/async/Timeout";
import {DataFields} from "../DataFields";
import {DataTable, DataTableColumnProps, DataTableProps} from "../DataTable";
import {EntityDataSource} from "../EntityDataSource";
import {TestConnection} from "./TestConnection";
import arrayContaining = jasmine.arrayContaining;
import objectContaining = jasmine.objectContaining;

export class TestDataTable<T, Fields extends DataFields<T> = {}>
    extends DataTable<T, Fields, DataTableProps<T, Fields, DataTableColumnProps<T, Fields>>> {

    render(): React.ReactNode {
        return createElement(Fragment)
    }
}

const getConnection = TestConnection([
    User, Group
]);

const Users = new EntityDataSource(User, {connection: getConnection});

beforeAll(async () => {
    await Users.insert({firstName: "David", lastName: "Ben Simon"});
    await Users.insert({firstName: "Anastasia", lastName: "Savchenko"});
});

describe('init', () => {

    let table: TestDataTable<User>;


    beforeAll(async () => {
        table = await createTable();
        await waitForTable(table);
    });

    it('expect key is field name', () => {
        expect(table.columns).toEqual(arrayContaining([
            objectContaining({
                field: "firstName",
                key: "firstName"
            })
        ]))
    });

});

describe('toggleSort', () => {
    it('expect to cycle', async () => {
        const table = createTable();
        expect(table.columns[0].sort).toBeUndefined();
        table.toggleSort(0);
        expect(table.columns[0].sort).toEqual('ASC');
        table.toggleSort(0);
        expect(table.columns[0].sort).toEqual('DESC');
        table.toggleSort(0);
        expect(table.columns[0].sort).toBeUndefined();
    });

    it('without multiSort', () => {
        const table = createTable({multiSort: false});
        table.toggleSort(0);
        table.toggleSort(1);
        expect(table.columns[0].sort).toBeUndefined();
        expect(table.columns[1].sort).not.toBeUndefined();
    });
    it('with multiSort', () => {
        const table = createTable({multiSort: true});
        table.toggleSort(0);
        table.toggleSort(1);
        expect(table.columns[0].sort).not.toBeUndefined();
        expect(table.columns[1].sort).not.toBeUndefined();
    });

});

async function waitForTable(table) {
    while (table.reloadDebounce.isPending() || table.isLoading)
        await Timeout(100);
}

function createTable(props?): TestDataTable<any> {
    const table = TestRenderer.create(createElement(TestDataTable as any, {
        ...props,
        source: Users, columns: [
            ...(props?.columns ?? []),
            {field: "firstName"},
            {field: "lastName"},
            {
                title: "FullName",
                field: {
                    $concat: [
                        "firstName",
                        {$value: " "},
                        "lastName",
                    ]
                }
            }
        ]
    })).getInstance() as any;
    expect(table).toBeInstanceOf(TestDataTable);
    return table;
}
