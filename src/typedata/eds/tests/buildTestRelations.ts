import {Connection} from "typeorm";
import {entries} from "../../../common/object/entries";


export async function buildTestRelations(getConnection:()=> Connection,
                                         entity, values) {
    const qb = getConnection()
        .getRepository(entity.constructor)
        .createQueryBuilder();
    for (const [propertyName, value] of entries(values)) {
        const relation = qb.relation(propertyName).of(entity);

        if (relation.expressionMap.relationMetadata.isManyToMany ||
            relation.expressionMap.relationMetadata.isOneToMany) {
            await relation.add(value)
        } else {
            await relation.set(value);
        }
    }
}

