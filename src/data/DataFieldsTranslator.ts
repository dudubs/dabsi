import {mapObject} from "../common/object/mapObject";
import {DataExp, StringDataExp} from "./DataExp";
import {DataFields} from "./DataFields";
import {DataExpMapper} from "./DataSource/DataExpMapper";

export class DataFieldsTranslator extends DataExpMapper<any> {
    constructor(public fields: DataFields<any>) {
        super();
    }

    translateField(propertyName: string): DataExp<any> {
        if (propertyName in this.fields) {
            if (typeof this.fields[propertyName] !== "string") {
                return this.translate(this.fields[propertyName])
            }
        }
        return super.translateField(propertyName);
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
