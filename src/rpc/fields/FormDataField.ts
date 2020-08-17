import {DataRow} from "../../data/DataRow";
import {DataSource} from "../../data/DataSource";
import {RemoteDataSource} from "../../data/RemoteDataSource";
import {DataExp} from "../../json-exp/DataExp";
import {Command} from "../Command";
import {FormField, FormFieldElementOf, FormFieldOptionsOf} from "../FormField";
import {Service} from "../Service";


export type FormDataField<T> = FormField<string | null, DataRow<T>,
    Service<{
        search: Command<[string], {
            count: number
            rows: DataRow<T>[]
        }>

        source: RemoteDataSource<{ label: string }>
    }>, {
    textFields?: DataExp<T>[];
}, {
    source: DataSource<T>
    maxSearchResults?: number
    labelField: DataExp<T>

    default?: DataRow<T>;

}, {
    default?: { label: string, $key: string },
    options: ({ label: string, $key: string })[]
}>;


export function FormDataField<T>(
    options?: FormFieldOptionsOf<FormDataField<T>>
): FormDataField<T> {
    if (!options)
        options = {};

    return FormField({
        options,

        remote: Service({
            search: Command<[string], {}>(),
            source: RemoteDataSource<{ label: string }>()
        }),

        async getElement(config): Promise<FormFieldElementOf<FormDataField<any>>> {
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


