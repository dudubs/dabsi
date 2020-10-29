import {Connection, DeepPartial, ObjectType} from "typeorm";

export async function buildTestEntities<T>(
    getConnection: () => Connection,
    entityType: ObjectType<T>,
    entities: DeepPartial<T>[]
): Promise<T[]> {
    const repo = getConnection().getRepository(entityType);
    return await repo.save(entities.map(entity => repo.create(entity)))
}
