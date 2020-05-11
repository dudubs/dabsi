import {cloneObject} from "../../common/object/cloneObject";
import {mapObject} from "../../common/object/mapObject";
import {JSONExp, JSONFieldKey} from "../../json-exp/JSONExp";
import {DataFields} from "../DataFields";
import {DataPath} from "../DataSource";
import {JSONExpMapper} from "./JSONExpMapper";

class _FieldsTranslator extends JSONExpMapper<any> {
    constructor(public fields: DataFields<any>) {
        super();
    }

    translateFieldExp(key: JSONFieldKey<any>): JSONExp<any> {
        if (key in this.fields) {
            if (typeof this.fields[key] !== "string") {
                return this.translate(this.fields[key])
            }
        }
        return super.translateFieldExp(key);
    }
}


export class DataCursor {

    path: DataPath = [];

    fields: DataFields<any> = {};

    exclude = new Set<string>();

    at(name: string, value: string): this {
        return cloneObject(this, {
            path: [...this.path, {type: "AT", name, value}],
            fields: {},
            exclude: new Set<any>()
        })
    }

    of(name: string, value: string): this {
        return cloneObject(this, {
            path: [...this.path, {type: "OF", name, value}],
        })
    }

    createTranslator() {
        return new _FieldsTranslator(this.fields)
    }

    translate(exp: JSONExp<any>): JSONExp<any> {
        return this.createTranslator().translate(exp)
    }

    field(key: string): JSONExp<any> {
        return this.fields[key] ?? key;
    }

    extend(fields: DataFields<any>): this {
        const translator = this.createTranslator();
        return cloneObject(this, {
            fields: {
                ...this.fields,
                ...mapObject(fields, exp => translator.translate(exp)),
            }
        })
    }

    pick(keys: string[]): this {
        return cloneObject(this, {
            fields: keys.toObject(key => [key,
                this.field(key)
            ])
        })
    }

    omit(keys: string[]): this {
        const fields = {...this.fields};
        const exclude = new Set<string>();
        for (let key of keys) {
            if (key in fields) {
                delete fields[key];
            } else {
                exclude.add(key);
            }
        }
        return cloneObject(this, {
            fields, exclude
        })
    }


}

