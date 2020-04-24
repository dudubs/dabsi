import {Connection, getConnection, ObjectType, RelationQueryBuilder, Repository, SelectQueryBuilder} from "typeorm";
import {assert} from "../common/assert";
import {defined, definedAt} from "../common/object/defined";
import {entries} from "../common/object/entries";
import {mapObject} from "../common/object/mapObject";
import {Lazy} from "../common/patterns/lazy";
import {JSONExp} from "../json-exp/JSONExp";
import {useQueryBuilderExp} from "../typeorm/exp/useQueryBuilderExp";
import {DataAll, DataFields, DataRow} from "./DataFields";
import {DataQuery, DataQueryResult} from "./DataQuery";
import {DataSource, DataValues} from "./DataSource";
import {EntityID, EntityIDHelper} from "./EntityID";


useQueryBuilderExp();

export type EntityDataSourceOptions<E> = {
    connection?: (() => Connection) | string | Connection;
};


type EntityDataSourceInfo<T> = {
    owner: {
        key: {
            type: "AT" | "OF",
            name: string,
            value: string
        },
        type: Function,
    } | undefined,
    type: ObjectType<T>;
};

export class EntityDataSource<T> extends DataSource<T> {


    constructor(
        public mainEntityType: ObjectType<T>,
        public options: EntityDataSourceOptions<T> = {}
    ) {
        super();
    }


    @Lazy get entityInfo(): EntityDataSourceInfo<T> {
        let entityType = this.mainEntityType;
        let owner: EntityDataSourceInfo<T>['owner'] = undefined;
        for (let key of this.path) {
            const metadata = defined(this.connection.getMetadata(entityType)
                .relations.find(relation => relation.propertyName === key.name), () =>
                `No relation "${key.name}" in ${entityType.name}.`);
            assert(typeof metadata.type === "function");

            switch (key.type) {
                case "AT":
                    owner = {type: entityType, key};
                    entityType = metadata.type;
                    break;
                case "OF":
                    owner = {type: metadata.type, key}
                    break;
            }
        }
        return {
      owner, type: entityType
        }
    }

    @Lazy get entityID(): EntityIDHelper<T> {
        return new EntityIDHelper<T>(this.entityRepository.metadata);
    }

    @Lazy get entityRepository() {
        return this.connection.getRepository(this.entityType)
    }

    get entityType(): ObjectType<T> {
        return this.entityInfo.type;
    }


    async get<Fields extends DataFields<T>>(key: string, fields: Fields): Promise<DataRow<T, Fields>> {
        const qb = this.entityRepository.createQueryBuilder();
        qb.expressionMap.selects.length = 0;
        const getValues = this.selectFields(qb, fields);
        const raw = await qb.andWhereExp(this.entityID.parse(key).toExpression())
            .getRawOne();
        if (!raw)
            throw new Error(`No record ${key}`);
        return getValues(raw);
    }


    selectFields<Fields extends DataFields<T>>(qb: SelectQueryBuilder<T>, fields: Fields):
        (raw: any) => DataRow<T, Fields> {

        let mapFields = {};
        let selectAll = false;

        if (fields === DataAll) {
            selectAll = true;
        } else if (Array.isArray(fields)) {
            selectAll = true;
            [mapFields] = fields;
        } else if (typeof fields === "object") {
            mapFields = fields;
        }

        // {include:""}

        const {expressionMap: {selects}} = qb;
        const fieldToAliasName: Record<string, string> = {};


        for (const [key, exp] of entries<JSONExp<T>>(mapFields)) {
            const aliasName = '_' + key;
            selects.push({selection: qb.exp(exp), aliasName});
            fieldToAliasName[key] = aliasName;
        }

        if (selectAll) {
            for (let column of this.entityRepository.metadata.columns) {
                if (column.propertyName in fieldToAliasName)
                    continue;

                const aliasName = '_' + column.propertyName;
                selects.push({selection: column.databaseName, aliasName});
                fieldToAliasName[column.propertyName] = aliasName;
            }
        }

        return raw => <any>mapObject(fieldToAliasName, aliasName => raw[aliasName]);
    }

    async find<Fields extends DataFields<T>>(query: DataQuery<T, Fields>):
        Promise<DataQueryResult<T, Fields>> {
        const qb = this.entityRepository.createQueryBuilder();


        for (let {by, type, nulls} of (query.order ?? [])) {
            qb.addOrderByExp(
                by,
                type === "DESC" ? "DESC" : "ASC",
                nulls === "FIRST" ? "NULLS FIRST" : "NULLS LAST"
            )
        }

        if (query.skip) {
            qb.skip(query.skip);
        }

        if (query.take) {
            qb.take(query.take);
        }

        const {expressionMap: {selects}} = qb;
        selects.length = 0;

        const getValues = this.selectFields(qb, query.fields);


        this.entityID.select(qb);

        return {
            count: !query.count ? undefined : (
                await qb.getCount()
            ),
            items: (await qb.getRawMany()).map(raw => {
                return {
                    key: this.entityID.load(raw).toString(),
                    row: <any>getValues(raw)
                }
            })
        }

    }

    count(filter?: JSONExp<T>): Promise<number> {
        return this.entityRepository.createQueryBuilder()
            .andWhereExp(filter)
            .getCount()
    }


    getRelation(entityID: EntityID<T>): {
        type: "to-many" | "to-one",
        builder: RelationQueryBuilder<any>,
        value: any
    } | undefined {
        const {entityInfo: {owner}} = this;

        if (!owner) return;
        const ownerMetadata = this.connection.getMetadata(owner.type);
        const ownerID = new EntityIDHelper(ownerMetadata).parse(owner.key.value);

        let relationType;
        let relationValue;
        let relationOwner;

        switch (owner.key.type) {
            case "AT":
                relationType = owner.type;
                relationValue = entityID.map;
                relationOwner = ownerID.map;
                break;
            case "OF":
                relationType = this.entityType;
                relationValue = ownerID.map;
                relationOwner = entityID.map;
                break;
            default:
                throw new Error(owner.key.type);
        }

        const builder = this.connection.getRepository(relationType)
            .createQueryBuilder()
            .relation(owner.key.name)
            .of(relationOwner);

        switch (definedAt(builder.expressionMap, "relationMetadata").relationType) {
            case "one-to-many":
            case "many-to-many":
                return {type: "to-many", builder, value: relationValue};
            case "many-to-one":
            case "one-to-one":
                return {type: "to-one", builder, value: relationValue}
        }
    }

    async insert<K extends keyof T>(values: DataValues<T>): Promise<string> {

        const entity = this.entityRepository.create(<any>values);
        await this.entityRepository.save(entity);
        const entityID = this.entityID.from(this.entityRepository.getId(<any>entity));
        const relation = this.getRelation(entityID);
        if (relation) {
            switch (relation.type) {
                case "to-many":
                    await relation.builder.add(relation.value);
                    break;
                case "to-one":
                    await relation.builder.set(relation.value);
                    break;
            }
        }
        return entityID.toString()
    }

    async update<K extends keyof T>(key: string, values: DataValues<T>): Promise<void> {
        await this.entityRepository.update(
            this.entityID.parse(key).asFindCondition(),
            <any>values);
    }

    async add(key: string) {
        const entityID = this.entityID.parse(key);
        const relation = this.getRelation(entityID);
        if (!relation)
            throw new Error('No relation')
        switch (relation.type) {
            case "to-many":
                return relation.builder.add(relation.value);
            case "to-one":
                return relation.builder.set(relation.value);
        }
    }

    async remove(key: string) {
        const entityID = this.entityID.parse(key);
        const relation = this.getRelation(entityID);
        if (!relation)
            throw new Error('No relation')
        switch (relation.type) {
            case "to-many":
                return relation.builder.remove(relation.value);
            case "to-one":
                return relation.builder.set(null);
        }
    }

    async delete(key: string): Promise<void> {
        await this.entityRepository.delete(
            this.entityID.parse(key).asFindCondition()
        );
    }

    get connection(): Connection {
        switch (typeof this.options.connection) {
            case "string":
                return getConnection(this.options.connection);
            case "function":
                return this.options.connection();
            case "object":
                return this.options.connection;
            default:
                throw new Error()
        }
    }

    static create<E>(entityType: ObjectType<E>, options?: EntityDataSourceOptions<E>):
        EntityDataSource<E> {
        return new EntityDataSource(
            entityType,
            options
        )
    }

}
