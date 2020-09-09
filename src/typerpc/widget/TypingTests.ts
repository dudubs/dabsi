import {At, IsSome} from "../../common/typings";
import {DataSource} from "../../data/DataSource";
import {NoRpc} from "../NoRpc";
import {RpcConfig} from "../Rpc";
import {DataTable} from "./DataTable";

export default function () {


    // DataTableConfig
    {


        test<RpcConfig<DataTable<{ xs: number }, NoRpc>>>(c => {
            c = $ => $({
                getRowConfig:undefined,
                source: test<DataSource<{ xs: string }>>(),
                // @ts-expect-error
                columns: {xs: null}
            });

            c = $ => $({
                getRowConfig:undefined,
                source: test<DataSource<{ xs: string }>>(),
                // @ts-expect-error
                columns: {xs: () => "s"}
            });

            c = $ => $({
                getRowConfig:undefined,
                source: test<DataSource<{ xs?: string }>>(),
                columns: {xs: () => 123}
            });
        });

        // Optional by row
        test<RpcConfig<DataTable<{ xs: string }, NoRpc>>>(c => {
            c = $ => $({
                getRowConfig:undefined,
                source: test<DataSource<{ xs: string }>>(),
                columns: {xs: null},

            });

            c = $ => $({
                getRowConfig:undefined,
                source: test<DataSource<{ xs?: string }>>(),
                // @ts-expect-error
                columns: {xs: null},
            });


            c = $ => $({
                getRowConfig:undefined,
                source: test<DataSource<{ xs?: string }>>(),
                columns: {xs: () => "s"}
            });


            c = $ => $({
                source: test<DataSource<{ xs?: string }>>(),
                // @ts-expect-error
                columns: {xs: () => undefined}
            });

            c = $ => $({
                source: test<DataSource<{ xs?: string }>>(),
                // @ts-expect-error
                columns: {xs: (row) => row.xs}
            });
        });


        // Optional by data
        test<RpcConfig<DataTable<{ xs?: string }, NoRpc>>>(c => {
            c = $ => $({
                getRowConfig:undefined,
                source: test<DataSource<{ xs: string }>>(),
                columns: {xs: null}
            });

            c = $ => $({
                getRowConfig:undefined,
                source: test<DataSource<{ xs?: string }>>(),
                columns: {xs: null}
            });

            c = $ => $({
                getRowConfig:undefined,
                source: test<DataSource<{ xs?: string }>>(),
                columns: {xs: () => undefined}
            });

            c = $ => $({
                getRowConfig:undefined,
                source: test<DataSource<{ xs?: string }>>(),
                columns: {xs: () => ""}
            });
        })

    }


}

declare function test<T>(callback?: (value: T) => void): T;

declare function assert<T>(value: T): T;
