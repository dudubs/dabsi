import { defined } from "../common/object/defined";
import { firstEntry } from "../common/object/firstEntry";
import { JSONExprTranslator } from "./JSONExprTranslator";
let counter = 0;
export class SQLExprTranslator extends JSONExprTranslator {
    constructor(qb, schema) {
        super();
        this.qb = qb;
        this.schema = schema;
    }
    translateLogical(all, exps) {
        return `(${exps.map(exp => this.translate(exp))
            .join(all ? " AND " : " OR ")})`;
    }
    translateCompare(op, left, right) {
        return "";
    }
    translateCount(key, where, limit) {
        return "";
    }
    translateValue(value) {
        const key = `value_${counter++}`;
        this.qb.setParameter(key, value);
        return ':' + key;
    }
    /*

        at: { users }
        atArray: { of:"users", where: "", take: "" }
     */
    translateComplex(c) {
        var _a;
        switch (c.type) {
            case "not":
                return `NOT ${this.translate(c.value)}`;
            case "concat":
                return this.translateConcat(c.value);
            case "value":
                return this.translateValue(c.value);
            case "is":
                const metadata = defined((_a = this.qb.expressionMap.mainAlias) === null || _a === void 0 ? void 0 : _a.metadata, 'No metadata');
                return this.translate({
                    all: metadata.primaryColumns.map(primaryColumn => [
                        primaryColumn.databaseName,
                        "equals",
                        { value: c.value[defined(primaryColumn.referencedColumn).propertyName] }
                    ])
                });
            case "at":
                const [key, expr] = defined(firstEntry(c.value));
                const schema = this.schema + '_' + key;
                if (this.qb.expressionMap.joinAttributes.find(j => j.alias.name === schema))
                    this.qb.leftJoin(`${this.schema}.${key}`, schema);
                return new SQLExprTranslator(this.qb, schema).translateValue(expr);
        }
        return super.translateComplex(c);
    }
    translateConcat(exps) {
        if (this.qb.connection.driver.options.type === "sqlite") {
            return `(${exps.map(exp => this.translate(exp)).join("||")})`;
        }
        else {
            return `CONCAT(${exps.map(exp => this.translate(exp)).join(",")})`;
        }
    }
}
