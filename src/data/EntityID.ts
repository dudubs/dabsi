import {EntityMetadata, FindConditions, SelectQueryBuilder} from "typeorm";
import {assert} from "../common/assert";
import {definedAt} from "../common/object/defined";
import {JSONExp} from "../json-exp/JSONExp";

const idAliasPrefix = 'id:';

export class EntityID<T> {
    constructor(
        public metadata: EntityMetadata,
        public values: Record<string, any>
    ) {
    }

    asFindCondition(): FindConditions<T> {
        return <any>this.values
    }


    toExpression(): JSONExp<T> {
        const exps = this.metadata.primaryColumns.map(column => <JSONExp<T>>[
            column.propertyName,
            {$equals: String(definedAt(this.values, column.propertyName))}
        ]);

        if (exps.length === 1)
            return exps[0];
        return {$and: exps}
    }

    toString() {
        if (this.metadata.primaryColumns.length === 1) {
            return String(definedAt(this.values, this.metadata.primaryColumns[0].propertyName))
        } else {
            return this.metadata.primaryColumns.map(column => `${column.propertyName}=${
                encodeURIComponent(String(
                    definedAt(this.values, column.propertyName)
                ))
            }`).join(',')
        }
    }

}

export class EntityIDHelper<T = any> {


    primaryColumns = this.metadata.primaryColumns;

    constructor(
        public metadata: EntityMetadata
    ) {
        assert(this.primaryColumns.length > 0);
    }


    select(qb: SelectQueryBuilder<any>) {
        for (let column of this.primaryColumns) {
            qb.expressionMap.selects.push({
                selection: `${qb.alias}.${column.databaseName}`,
                aliasName: idAliasPrefix + column.propertyName
            })
        }
    }

    load(raw: Record<string, any>): EntityID<T> {
        if (this.metadata.primaryColumns.length === 1) {
            return new EntityID<T>(this.metadata, {
                [this.primaryColumns[0].propertyName]:
                    definedAt(raw, idAliasPrefix + this.primaryColumns[0].propertyName)
            })
        } else {
            return new EntityID<T>(this.metadata, this.primaryColumns.toObject(column => [
                column.propertyName,
                definedAt(raw, idAliasPrefix + column.propertyName)
            ]))
        }
    }


    fromObject(obj: object) {
        return new EntityID(this.metadata, this.primaryColumns.toObject(column => [
            column.propertyName,
            definedAt(obj as any, column.propertyName)
        ]))
    }

    from(id: any) {
        switch (typeof id) {
            case "object":
                return this.fromObject(id);
            case "string":
            case "number":
                assert(this.primaryColumns.length === 1);
                return new EntityID(this.metadata, {
                    [this.primaryColumns[0].propertyName]: id
                });

        }
        throw new TypeError(`Not support ${typeof id}`);
    }

    parse(text: string): EntityID<T> {
        if (this.primaryColumns.length === 1) {
            return new EntityID<T>(
                this.metadata,
                {[this.primaryColumns[0].propertyName]: text}
            )
        } else {
            const fields: Record<string, any> = {};
            for (let field of text.split(",")) {
                const [key, value] = field.split("=");
                fields[key] = decodeURIComponent(value);
            }
            return new EntityID<T>(this.metadata, Object.fromEntries(
                this.primaryColumns.map(column => [
                    column.propertyName,
                    definedAt(fields, column.propertyName)
                ])
            ))
        }
    }

}
