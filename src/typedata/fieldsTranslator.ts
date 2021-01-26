import { mapObject } from "@dabsi/common/object/mapObject";
import { DataExp, DataStringExp } from "@dabsi/typedata/exp/exp";
import { DataFields } from "@dabsi/typedata/fields";
import { DataExpMapper } from "@dabsi/typedata/exp/mapper";

export class DataFieldsTranslator extends DataExpMapper {
  constructor(public fields: DataFields<any>, public isBase = false) {
    super();
  }

  translateBase(exp: DataExp<any>): DataExp<any> {
    if (this.isBase) {
      return super.translateBase(exp);
    }
    return new DataFieldsTranslator(this.fields, true).translate(exp);
  }

  translateField(propertyName: string): DataExp<any> {
    if (this.isBase) return super.translateField(propertyName);
    if (propertyName in this.fields) {
      if (typeof this.fields[propertyName] !== "string") {
        return this.translate(this.fields[propertyName]);
      }
    }
    return super.translateField(propertyName);
  }

  static translate(
    baseFields: DataFields<any> | undefined,
    fields: DataFields<any> | undefined
  ) {
    if (!(baseFields && fields)) return fields;
    const translator = new DataFieldsTranslator(baseFields);
    return mapObject(fields, exp => translator.translate(exp));
  }
}
