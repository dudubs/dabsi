import {mapObject} from "../common/object/mapObject";
import {DataExp, StringDataExp} from "../json-exp/DataExp";
import {DataFields} from "./DataFields";
import {DataExpMapper} from "./DataSource/DataExpMapper";

export class DataFieldsTranslator extends DataExpMapper<any> {
    constructor(public fields: DataFields<any>) {
        super();
    }

    translateFieldExp(key: StringDataExp<any>): DataExp<any> {
        if (key in this.fields) {
            if (typeof this.fields[key] !== "string") {
                return this.translate(this.fields[key])
            }
        }
        return super.translateFieldExp(key);
    }


    static translate(
        baseFields: DataFields<any> | undefined,
        fields: DataFields<any> | undefined
    ) {
        if (!(baseFields && fields))
            return fields;
        const translator = new DataFieldsTranslator(baseFields);
        return mapObject(fields, exp => translator.translate(exp))
    }
}
