import exp from "constants";
import {SelectQueryBuilder} from "typeorm";
import {EntityMetadata} from "typeorm/metadata/EntityMetadata";
import {defined, definedAt} from "../../common/object/defined";
import {ArrayTypeOrObject, KeysByValue} from "../../common/typings";
import {
    JSONExp,
    JSONExpTypes,
    JSONFieldKey,
    JSONNamedOperator,
    JSONCompareOperator,
    JSONPrimitive
} from "../../json-exp/JSONExp";
import {JSONExpTranslator} from "../../json-exp/JSONExpTranslator";
import {_matchJoinColumns, _mergeQueryParameters} from "./utils";

let counter = 0;

const SQLOperators: Record<JSONNamedOperator, string> = {
    $equals: '=',
    $notEquals: '!=',
    $lessThan: '<',
    $lessThanOrEqual: '<=',
    $greaterThan: '>',
    $greaterThanOrEqual: '=>',
    $startsWith: ' LIKE ',
    $endsWith: ' LIKE ',
    $contains: ' LIKE '
};

export class QBJSONExpTranslator<T> extends JSONExpTranslator<T, string> {
    constructor(public qb: SelectQueryBuilder<T>,
                public schema: string) {
        super();

    }

    True = '1';

    False = '1';

    all(exps: string[]): string {
        exps =
            // optimization
            exps.filter(exp => exp !== this.True)
        if (1 >= exps.length)
            return exps[0] ?? this.True;
        return `(${exps.join(' AND ')})`
    }

    any(exps: string[]): string {
        // optimization
        for (const exp of exps) {
            if (exp === this.True) {
                return exp;
            }
        }
        if (1 >= exps.length)
            return exps[0] ?? this.True;
        return `(${exps.join(' OR ')})`
    }

    translateCompare(op: JSONCompareOperator, left: JSONExp<T>, right: JSONExp<T>): string {

        let rightSql = this.translate(right);
        const p = "'%'";
        switch (op) {
            case "$startsWith":
                rightSql = this.concat([rightSql, p]);
                break
            case "$endsWith":
                rightSql = this.concat([p, rightSql]);
                break
            case "$contains":
                rightSql = this.concat([p, rightSql, p]);
                break
        }
        return `${this.translate(left)}${SQLOperators[op]}${rightSql}`
    }

    get schemaMetadata(): EntityMetadata {
        return defined(this.qb.expressionMap.aliases
            .find(alias => alias.name === this.schema), () =>
            `No schemaMetadata ${this.schema}`)
            .metadata;
    }


    subQuery(key: string,
             where: JSONExp<any>,
             callback: (qb: SelectQueryBuilder<any>,
                        translator: QBJSONExpTranslator<any>) => void
    ): string {

        const leftMetadata = defined(
            this.schemaMetadata.relations.find(r => r.propertyName === key), () =>
                `No relation by key for ${key}`);

        const ownerMetadata = leftMetadata.isOwning ? leftMetadata :
            definedAt(leftMetadata, 'inverseRelation');
        const leftJoinColumns =
            defined(leftMetadata.isOwning ?
                ownerMetadata.joinColumns : ownerMetadata.inverseJoinColumns,
                'No leftJoinColumns');
        const rightJoinColumns =
            leftMetadata.isOwning ?
                ownerMetadata.inverseJoinColumns : ownerMetadata.joinColumns;
        const rightEntityMetadata =
            leftMetadata.isOwning ?
                definedAt(ownerMetadata, 'inverseEntityMetadata') :
                ownerMetadata.entityMetadata;
        const subQb = this.qb.connection
            .createQueryBuilder(ownerMetadata.joinTableName, "_left");

        const subTranslator = new QBJSONExpTranslator<any>(subQb, "_right");

        callback(subQb, subTranslator);

        subQb.leftJoin(rightEntityMetadata.target, "_right",
            _matchJoinColumns(rightJoinColumns, "_left", "_right")
        )
        subQb.andWhere(_matchJoinColumns(leftJoinColumns, "_left", this.schema))

        if (where) {
            subQb.andWhere(subTranslator.translate(where))
        }
        _mergeQueryParameters(this.qb, subQb);
        return `(${subQb.getQuery()})`
    }


    translateFrom(key: string,
                  take: JSONExp<any>,
                  where: JSONExp<any>
    ): string {
        return this.subQuery(
            key, where,
            (qb, translator) => {
                qb.select(translator.translate(take))
            }
        )
    }


    translateCount(key: string, where: JSONExp<any>, maxCount: number): string {
        return this.subQuery(key, where, qb => {
            qb.select('COUNT(*)')
            if (maxCount) {
                qb.limit(maxCount)
            }
        })
    }

    counter = 0;

    translateField(key: JSONFieldKey<T>): string {
        return `${this.schema}.${key}`
    }

    translateValue(value: JSONPrimitive): string {
        const key = `v_${counter++}_${this.counter++}`
        this.qb.setParameter(key, value);
        return ':' + key;
    }

    $is<K>(value: JSONExpTypes<T>["$is"]): string {
        return this.all(this.schemaMetadata.primaryColumns.map(
            primaryColumn => this.translate([
                <JSONFieldKey<T>>primaryColumn.databaseName,
                "$equals",
                {$value: value[primaryColumn.propertyName]}
            ])
        ));
    }

    $length<K>(value: JSONExpTypes<T>["$length"]): string {
        return `LENGTH(${this.translate(value)})`;
    }

    $not<K>(value: JSONExpTypes<T>["$not"]): string {
        return `NOT ${this.translate(value)}`;
    }

    translateAt<K extends KeysByValue<T, object>>(key: K, expr: JSONExp<ArrayTypeOrObject<T[K]>>): string {
        const schema = this.schema + '_' + key;
        if (!this.qb.expressionMap.joinAttributes.find(j => j.alias.name === schema))
            this.qb.leftJoin(`${this.schema}.${key}`, schema);
        // @ts-ignore
        return new QBJSONExpTranslator(this.qb, schema).translate(expr);
    }

    concat(exps: string[]): string {
        if (this.qb.connection.driver.options.type === "sqlite") {
            return `(${exps.join("||")})`
        } else {
            return `CONCAT(${exps.join(",")})`
        }
    }


    translateIn(where: JSONExp<T>, values: JSONExp<T>[]): string {
        if (values.length === 0)
            return this.True;
        if (values.length === 1)
            return this.translateCompare('$equals', where, values[0]);
        return `${this.translate(where)} IN (${
            values.map(value => this.translate(value)).join(",")
        })`
    }
}


