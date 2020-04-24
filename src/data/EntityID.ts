import {EntityMetadata, FindConditions, SelectQueryBuilder} from "typeorm";
import {assert} from "../common/assert";
import {definedAt} from "../common/object/defined";
import {JSONExp} from "../json-exp/JSONExp";

const idAliasPrefix = 'id:';

export class EntityID<T> {
    constructor(
        public helper: EntityIDHelper<T>,
        public map: Record<string, any>
    ) {
    }

    asFindCondition(): FindConditions<T> {
        return <any>this.map
    }

    toExpression(): JSONExp<T> {
        const exps = this.helper.primaryColumns.map(column => <JSONExp<T>>[
            column.propertyName,
            {$equals: String(definedAt(this.map, column.propertyName))}
        ]);

        if (exps.length === 1)
            return exps[0];
        return {$all: exps}
    }

    toString() {
        if (this.helper.primaryColumn) {
            return String(definedAt(this.map, this.helper.primaryColumn.propertyName))
        } else {
            return this.helper.primaryColumns.map(column => `${column.propertyName}=${
                encodeURIComponent(String(
                    definedAt(this.map, column.propertyName)
                ))
            }`).join(',')
        }
    }

}

export class EntityIDHelper<T = any> {


    primaryColumns = this.metadata.primaryColumns;

    primaryColumn =
        1 === this.primaryColumns.length ?
            definedAt(this.primaryColumns, 0) : undefined;

    constructor(
        public metadata: EntityMetadata
    ) {
        assert(this.primaryColumns.length > 0);
    }


    select(qb: SelectQueryBuilder<any>) {
        for (let column of this.primaryColumns) {
            qb.expressionMap.selects.push({
                selection: column.databaseName,
                aliasName: idAliasPrefix + column.propertyName
            })
        }
    }

    load(raw: Record<string, any>): EntityID<T> {
        if (this.primaryColumn) {
            return new EntityID<T>(this, {
                [this.primaryColumn.propertyName]:
                    definedAt(raw, idAliasPrefix + this.primaryColumn.propertyName)
            })
        } else {
            return new EntityID<T>(this, this.primaryColumns.toObject(column => [
                column.propertyName,
                definedAt(raw, idAliasPrefix + column.propertyName)
            ]))
        }
    }


    fromObject(obj: Record<string, any>) {
        return new EntityID(this, this.primaryColumns.toObject(column => [
            column.propertyName,
            definedAt(obj, column.propertyName)
        ]))
    }

    from(id: any) {
        switch (typeof id) {
            case "object":
                return this.fromObject(id);
            case "string":
            case "number":
                assert(this.primaryColumn);
                return new EntityID(this, {
                    [this.primaryColumn.propertyName]: id
                });

        }
        throw new TypeError(`Not support ${typeof id}`);
    }

    parse(text: string): EntityID<T> {
        if (this.primaryColumn) {
            return new EntityID<T>(
                this,
                {[this.primaryColumn.propertyName]: text}
            )
        } else {
            const fields: Record<string, any> = {};
            for (let field of text.split(",")) {
                const [key, value] = field.split("=");
                fields[key] = decodeURIComponent(value);
            }
            return new EntityID<T>(this, Object.fromEntries(
                this.primaryColumns.map(column => [
                    column.propertyName,
                    definedAt(fields, column.propertyName)
                ])
            ))
        }
    }

}
