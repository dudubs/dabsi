import {EntityMetadata, ObjectType} from "typeorm";
import {Type} from "../common/typings";
import {DataCursorPath} from "./DataSource";
import {EntityDataSource} from "./EntityDataSource";
import {EntityIDHelper} from "./EntityID";


// at proName, ownerKey



export class EntityDataSourceHelper<T> {

    constructor(
        public source: EntityDataSource<T>,
        public type: ObjectType<T>,
        public relation: undefined | { type: Type<any> } & DataCursorPath,
    ) {

    }

    repository = this.source.connection.getRepository(this.type);

    entityMetadata: EntityMetadata = this.repository.metadata;

    idHelper = new EntityIDHelper(this.entityMetadata);

}
