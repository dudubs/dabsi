import {DeepPartial, ObjectType} from "typeorm";
import {getTestConnection} from "./TestConnection";

export async function saveAll<T>(entityType: ObjectType<T>, data: DeepPartial<T>[]) {
    const repo = getTestConnection().getRepository(entityType);
    return await repo.save(
        data.map(data => repo.create(data))
    )
}
