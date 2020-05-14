import {Connection, ObjectType, Repository, SelectQueryBuilder} from "typeorm";
import {ColumnMetadata} from "typeorm/metadata/ColumnMetadata";
import {assert} from "../../common/assert";
import {defined, definedAt} from "../../common/object/defined";

export class SideRelation<T> {
    constructor(
        public relation: Relation<any, any>,
        public entityType: ObjectType<T>,
        public isLeft: boolean,
    ) {
    }

    entityMetadata = this.relation.connection.getMetadata(this.entityType);

    get repository(): Repository<T> {
        return this.relation.connection.getRepository(this.entityType)
    }

    isOwning = this.relation.ownerRelationMetadata.target === this.entityType

    isOwningLeft = this.isOwning && this.isLeft;

    inverse = (this.isOwning ? !this.isLeft : this.isLeft);

    joinColumns =
        !this.isOwning ? this.relation.ownerRelationMetadata.inverseJoinColumns :
            this.relation.ownerRelationMetadata.joinColumns;

    column(column: ColumnMetadata) {
        return this.isOwning ? column : definedAt(column, "referencedColumn");
    }

    joinColumn(column: ColumnMetadata) {

        if(this.isLeft) {
            if (this.isOwning) {
                return column;
            }
        } else {
            if (!this.isOwning) {
                return column;
            }
        }
        // if(this.isLeft)
        //     return column;

        return definedAt(column, "referencedColumn");
    }


}

export abstract class Relation<T, U> {


    abstract getLeftEntityType(): ObjectType<T>;

    abstract getRightEntityType(): ObjectType<U>;

    constructor(
        public connection: Connection,
        public entityType: ObjectType<any>,
        public propertyName: string,
    ) {
    }


    entityMetadata = this.connection.getMetadata(this.entityType);

    relationMetadata = defined(this.entityMetadata
        .relations.find(r => r.propertyName === this.propertyName));

    ownerRelationMetadata = this.relationMetadata.isOwning ?
        this.relationMetadata : definedAt(this.relationMetadata, "inverseRelation");


    left = new SideRelation(this, this.getLeftEntityType(), true);

    right = new SideRelation(this, this.getRightEntityType(), false);


    getRelationType(): ObjectType<any> {
        assert(typeof this.relationMetadata?.type === "function");
        return this.relationMetadata.type;
    }

    createQueryBuilder(): SelectQueryBuilder<T> {
        return this.left.repository.createQueryBuilder()
    }
}

export class RelationAt<T, U> extends Relation<T, U> {

    getLeftEntityType(): ObjectType<T> {
        return this.getRelationType()
    }

    getRightEntityType(): ObjectType<U> {
        return this.entityType;
    }


}

export class RelationOf<T, U> extends Relation<T, U> {


    getLeftEntityType(): ObjectType<T> {
        return this.entityType;
    }

    getRightEntityType(): ObjectType<U> {
        return this.getRelationType()
    }

}
