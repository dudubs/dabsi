import {SelectQueryBuilder} from "typeorm";
import {WeakMapFactory} from "../../common/map/mapFactory";


export class QueryBuilderSelector {
    aliasNameToAliasName: Record<string, string> = {};
    selectionToAliasName: Record<string, string> = {};
    aliasNames = new Set<string>()

    constructor(
        public qb: SelectQueryBuilder<any>
    ) {
        qb.expressionMap.selects.length = 0;
    }

    // selectFromSchema(...)

    select(selection: string, aliasName: string/* TODO: optional*/,
           schema?: string/**/):
        (raw: object) => any {
        if (schema) {
            selection =
                this.qb.connection.driver.escape(schema)
                + '.'
                + this.qb.connection.driver.escape(selection);
        }

        if (this.aliasNames.has(aliasName)) {
            throw new Error(`Alias name "${aliasName}" already in use`);
        }
        this.aliasNames.add(aliasName);

        const prevAliasName = this.selectionToAliasName[selection];

        if (prevAliasName !== undefined) {
            this.aliasNameToAliasName[aliasName] =
                this.selectionToAliasName[selection] = prevAliasName;

            return raw => raw[prevAliasName]

        }

        this.selectionToAliasName[selection] = aliasName;
        this.qb.expressionMap.selects.push({selection, aliasName})
        return raw => raw[aliasName]

    }
    //
    // load(raw: object, aliasName: string) {
    //     return raw[this.aliasNameToAliasName[aliasName] ?? aliasName]
    // }
}

