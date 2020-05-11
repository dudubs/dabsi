import {SelectQueryBuilder} from "typeorm";
import {EntityMetadata} from "typeorm/metadata/EntityMetadata";
import {defined, definedAt} from "../../common/object/defined";
import {
    JSONCompareOperator,
    JSONExp,
    JSONExpTypes,
    JSONFieldKey,
    JSONNamedOperator,
    JSONPrimitive
} from "../../json-exp/JSONExp";
import {JSONExpTranslator} from "../../json-exp/JSONExpTranslator";
import {_matchJoinColumns} from "./utils";

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

    static create<T>(qb: SelectQueryBuilder<T>): QBJSONExpTranslator<T> {
        return new QBJSONExpTranslator<T>(qb, qb.alias, null)
    }

    constructor(public qb: SelectQueryBuilder<T>,
                public schema: string,
                protected _rootQb: SelectQueryBuilder<T> | null) {
        super();

    }

    True = '1';

    False = '1';

    get rootQb(): SelectQueryBuilder<any> {
        return this._rootQb ?? this.qb;
    }

    translateAll(exps: string[]): string {
        exps =
            // optimization
            exps.filter(exp => exp !== this.True)
        if (1 >= exps.length)
            return exps[0] ?? this.True;
        return `(${exps.join(' AND ')})`
    }

    translateAny(exps: string[]): string {
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

    translateCompare(op: JSONCompareOperator, left: string, right: string): string {
        switch (op) {
            case "$startsWith":
                right = this.translateConcat([right, "'%'"]);
                break;

            case "$endsWith":
                right = this.translateConcat(["'%'", right]);
                break;

            case "$contains":
                right = this.translateConcat(["'%'", right, "'%'"]);
                break;
        }
        return `${left}${SQLOperators[op]}${right}`;
    }


    get schemaMetadata(): EntityMetadata {
        return defined(this.qb.expressionMap.aliases
            .find(alias => alias.name === this.schema), () =>
            `No schemaMetadata ${this.schema}`)
            .metadata;
    }


    getToManyTranslator(key: string): QBJSONExpTranslator<any> {

        const leftMetadata = defined(
            this.schemaMetadata.relations.find(r => r.propertyName === key), () =>
                `No relation by key for ${key}`);

        switch (leftMetadata.relationType) {
            case "one-to-many": {

                const rightAliasName = `_${leftMetadata.entityMetadata.name}_${++this.counter}`;

                const subQb = this.qb.connection.getRepository(leftMetadata.type)
                    .createQueryBuilder(rightAliasName);

                const ownerMetadata = definedAt(leftMetadata, "inverseRelation");
                subQb.andWhere(_matchJoinColumns(ownerMetadata.joinColumns,
                    rightAliasName,
                    this.schema))
                return new QBJSONExpTranslator<any>(
                    subQb,
                    rightAliasName,
                    this.rootQb
                )
            }

            case "many-to-many": {
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

                const rightAliasName = `_${rightEntityMetadata.name}_${++this.counter}`;

                const leftAliasName = `${leftMetadata.entityMetadata.name}_to_${rightEntityMetadata.name}_${++this.counter}`

                const subQb = this.qb.connection
                    .createQueryBuilder(ownerMetadata.joinTableName, leftAliasName);


                subQb.leftJoin(rightEntityMetadata.target, rightAliasName,
                    _matchJoinColumns(rightJoinColumns, leftAliasName, rightAliasName)
                )

                subQb.andWhere(_matchJoinColumns(leftJoinColumns, leftAliasName, this.schema))
                return new QBJSONExpTranslator<any>(
                    subQb,
                    rightAliasName,
                    this.rootQb
                )
            }
            default:
                throw new TypeError(`Not support ${leftMetadata.relationType}`)
        }
    }


    getToManyQuery(key: string,
                   where: JSONExp<any>,
                   callback: (qb: SelectQueryBuilder<any>,
                              translator: QBJSONExpTranslator<any>) => void
    ): string {


        const subTranslator = this.getToManyTranslator(key);


        callback(subTranslator.qb, subTranslator);

        if (where) {
            subTranslator.qb.andWhere(subTranslator.translate(where))
        }

        return `(${subTranslator.qb.getQuery()})`
    }


    translateFromExp(key: string, take: JSONExp<any>, where: JSONExp<any>): string {
        return this.getToManyQuery(
            key, where,
            (qb, translator) => {
                qb.select(translator.translate(take))
            }
        )
    }

    translateCountExp(key: string, where: JSONExp<any>, maxCount: number): string {
        return this.getToManyQuery(key, where, qb => {
            qb.select('COUNT(*)')
            if (maxCount) {
                qb.limit(maxCount)
            }
        })
    }

    counter = 0;

    translateFieldExp(key: JSONFieldKey<T>): string {
        return `${this.schema}.${key}`
    }

    translateValue(value: JSONPrimitive): string {
        const key = `v_${counter++}_${this.counter++}`
        this.rootQb.setParameter(key, value);
        return ':' + key;
    }

    translateIs(exp: T): string {
        return this.translateAll(this.schemaMetadata.primaryColumns.map(
            primaryColumn => this.translate([
                <JSONFieldKey<T>>primaryColumn.databaseName,
                "$equals",
                {$value: exp[primaryColumn.propertyName]}
            ])
        ));
    }

    translateLength(exp: string): string {
        return `LENGTH(${exp})`
    }

    translateNot(exp: string): string {
        return `NOT ${exp}`
    }


    translateAt(key: string, exp: JSONExp<any>): string {
        const schema = this.schema + '_' + key;
        if (!this.qb.expressionMap.joinAttributes.find(j => j.alias.name === schema))
            this.qb.leftJoin(`${this.schema}.${key}`, schema);

        return new QBJSONExpTranslator(this.qb, schema, this.rootQb).translate(exp);
    }


    translateConcat(exps: string[]): string {
        if (this.qb.connection.driver.options.type === "sqlite") {
            return `(${exps.join("||")})`
        } else {
            return `CONCAT(${exps.join(",")})`
        }
    }

    translateIn(where: string, values: string[]): string {
        if (values.length === 0)
            return this.True;
        if (values.length === 1)
            return this.translateCompare('$equals', where, values[0]);
        return `${where} IN (${
            values.join(",")
        })`
    }

}


