import {DataRow} from "../../data/DataRow";
import {DataSource} from "../../data/DataSource";
import {RemoteDataSource} from "../../data/RemoteDataSource";
import {DataExp} from "../../json-exp/DataExp";
import {Command} from "../Command";
import {FormField, FormFieldType} from "../FormField";
import {Service} from "../Service";


export type FormDataField<T> = FormField<{

    Data: string | null,

    Value: DataRow<T>,

    Remote: Service<{
        search: Command<[string], {
            count: number
            rows: DataRow<T>[]
        }>

        source: RemoteDataSource<{ label: string }>
    }>,

    Options: {
        textFields?: DataExp<T>[];
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

    Error: null


}>;


export function FormDataField<T>(
    options?: FormFieldType<FormDataField<T>>['Options']
): FormDataField<T> {
    if (!options)
        options = {};

    return FormField({
        options,

        remote: Service({
            search: Command<[string], {
                count: number
                rows: DataRow<T>[]
            }>(),
            source: RemoteDataSource<{ label: string }>()
        }),

        async getElement(config): Promise<FormFieldType<FormDataField<any>>['Element']> {
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
        getRemoteConfig(config) {


            return {

                source:
                    <DataSource<{ label: string }>>
                        <DataSource<any>>
                            config.source.select({
                                fields: {
                                    label: config.labelField
                                }
                            } as const),

                async search(text: string) {
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
            }
        },

    })
}


