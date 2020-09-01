import {DataExp} from "../../data/DataExp";
import {DataRow} from "../../data/DataRow";
import {DataSource} from "../../data/DataSource";
import {NoRpc} from "../NoRpc";
import {DataSelectInputContext} from "./DataSelectInputContext";
import {Input, InputType} from "./Input";


export type DataInputOption = { key: string, label: string };

export type DataSelectInput<T> = Input<{

    Data: string | null,

    Value: DataRow<T> | null,

    Controller: NoRpc,

    Props: {
        textFields?: DataExp<T>[];
        required?: boolean
    },


    Config: {

        source: DataSource<T>
        maxSearchResults?: number
        labelField: DataExp<T>

        default?: string;

    },

    Element: {
        default?: string,
        options: DataInputOption[]
    }

    Error: "REQUIRED"


}>;


export function DataSelectInput<T>(
    props: InputType<DataSelectInput<T>>['Props'] = {}
): DataSelectInput<T> {
    return <DataSelectInput<T>>Input<DataSelectInput<any>>({
        props: props,
        controller: NoRpc,
        getContextClass: () => DataSelectInputContext,

    })
}


/*

DataSelectInput()


InputMap({
    x: DataSelectInput()
})

handle {
    x: $ => $({
        source: ...

    })

}






.handle $ => $({

    source

    getValue: row=> {
        ...
    }
})

 */
