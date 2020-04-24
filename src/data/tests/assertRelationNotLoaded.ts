import {defined} from "../../common/object/defined";
import {KeysByValue} from "../../common/typings";
import {getTestConnection} from "./TestConnection";

export async function assertRelationNotLoaded<T extends object>(
    entity: T, key: KeysByValue<T, object>) {
    return expect(await getTestConnection().getRepository<any>(entity.constructor).createQueryBuilder()
        .andWhereInIds(
            getTestConnection().getRepository(entity.constructor)
                .getId(entity)
        )
        .getOne()
        .then(defined)
        .then(row => row[key])
    ).toBeUndefined();
}
