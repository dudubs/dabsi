import {DataExp} from "../../data/DataExp";
import {DataRow} from "../../data/DataRow";
import {DataSource} from "../../data/DataSource";
import {RemoteDataSource} from "../../data/RemoteDataSource";
import {Command} from "../Command";
import {Input, InputType} from "./Input";
import {Service} from "../Service";

export type TDataInput<T> = {

    Data: string | null,

    Value: DataRow<T> | null,

    Controller: Service<{
        search: Command<[string], {
            count: number
            rows: DataRow<T>[]
        }>

        source: RemoteDataSource<{ label: string }>
    }>,

    Static: {
        textFields?: DataExp<T>[];
        required?: boolean
    },

    Config: {
        source: DataSource<T>
        maxSearchResults?: number
        labelField: DataExp<T>

        default?: DataRow<T>;

    },

    Element: {
        default?: { label: string, $key: string },
        options: ({ label: string, $key: string })[]
    }

    Error: "REQUIRED"


}
export type DataInput<T> = Input<TDataInput<T>>;


export function DataInput<T>(
    options: TDataInput<T>['Static'] = {}
): DataInput<T> {
    return Input({
        static: options,
        controller: Service({
            search: Command<[string], {
                count: number
                rows: DataRow<T>[]
            }>(),
            source: RemoteDataSource<{ label: string }>()
        }),

        createContext: config => {
            return {
                loadAndCheck: async data => {
                    if (!data) {
                        if (options?.required) {
                            return {error: "REQUIRED"}
                        }
                        return {value: null}
                    }
                    return {value: await config.source.getOrFail(data)}
                },
                getElement: async (): Promise<InputType<DataInput<any>>['Element']> => {
                    const options = await config.source.pick({
                        label: config.labelField
                    }).items();

                    return {
                        // @ts-ignore
                        options,
                        default:
                            await config.default?.pick({label: <any>config.labelField})
                    }
                },

                getControllerConfig: () => ({

                    source:
                        <DataSource<{ label: string }>>
                            <DataSource<any>>
                                config.source.select({
                                    fields: {
                                        label: config.labelField
                                    }
                                } as const),

                    search: async (text: string) => {
                        if (!options?.textFields)
                            throw new Error()
                        const [count, rows] = await config.source.filter({
                            $and: options.textFields.map(exp => {
                                return {
                                    $search: {
                                        in: exp,
                                        text
                                    }
                                }
                            })
                        }).take(config.maxSearchResults ?? 20).countAndQuery()
                        return {count, rows}
                    }
                }),
            }
        },


    })
}


