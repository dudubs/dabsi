// of users, userKey
import {EntityMetadata} from "typeorm";
import {RelationMetadata} from "typeorm/metadata/RelationMetadata";
import {RelationQueryBuilder} from "typeorm/query-builder/RelationQueryBuilder";
import {defined, definedAt} from "../common/object/defined";
import {Lazy} from "../common/patterns/lazy";
import {EntityDataSource} from "./EntityDataSource";
import {EntityID, EntityIDHelper} from "./EntityID";


export class RelationEntityDataSourceHelper {
    constructor(
        public source: EntityDataSource<any>
    ) {
    }

    info = definedAt(this.source.helper, 'relation')

    entityMetadata: EntityMetadata = this.source.connection.getMetadata(this.info.type);

    @Lazy() get entityId(): EntityID<any> {
        return new EntityIDHelper(this.entityMetadata).parse(
            this.info.key
        )
    }

    @Lazy() get relationMetadata(): RelationMetadata {
        return defined((
            this.info.owner ?
                this.entityMetadata.relations :
                this.source.helper.entityMetadata.relations
        ).find(r => r.propertyName === this.info.propertyName))
    }

    @Lazy() get ownerType() {
        return this.info.owner ? this.info.type : this.source.helper.type;
    }

    @Lazy() get relation() {
        return this.source.connection.getRepository(this.ownerType)
            .createQueryBuilder()
            .relation(this.info.propertyName)
    }

    get isToMany() {
        return this.relationMetadata.isManyToMany || this.relationMetadata.isOneToMany;
    }

    get isToOne() {
        return this.relationMetadata.isManyToOne || this.relationMetadata.isOneToOne;
    }

    getOwnerId(entityId: EntityID<any>): EntityID<any> {
        return this.info.owner ? this.entityId : entityId;
    }

    getItemId(entityId: EntityID<any>): EntityID<any> {
        return this.info.owner ? entityId : this.entityId;
    }


    getRelationOf(entityId: EntityID<any>): RelationQueryBuilder<any> {
        return this.relation.of(this.getOwnerId(entityId));
    }

    remove(entityId: EntityID<any>) {
        const relation = this.relation.of(this.getOwnerId(entityId).map);
        if (this.isToMany) {
            return relation.add(this.getItemId(entityId).map);
        } else if (this.isToOne) {
            return relation.set(null);
        }
    }


    add(entityId: EntityID<any>) {
        const relation = this.relation.of(this.getOwnerId(entityId).map);
        const item = this.getItemId(entityId).map;
        if (this.isToMany) {
            return relation.add(item);
        } else if (this.isToOne) {
            return relation.set(item)
        }
    }



}
