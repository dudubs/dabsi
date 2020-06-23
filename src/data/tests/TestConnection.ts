import {Connection, createConnection, ObjectType} from "typeorm";
import {defined} from "../../common/object/defined";
import {Awaitable} from "../../common/typings";

export let getTestConnection: () => Connection;


let counter = 0;


export function defineTestConnection(callback: (connection: Connection) => Awaitable,
                                     entities: any[]) {
    beforeAll(async () => {
        await callback(await createTestConnection(entities))
    })
}

export function createTestConnection(entities: ObjectType<any>[]): Promise<Connection> {
    return createConnection({
        name: 'testConnection' + (++counter),
        type: "sqlite",
        database: ":memory:",
        synchronize: true,
        // logging: "all",
        entities
    })
}

export function TestConnection(
    entities
): () => Connection {

    let connection: Connection;

    beforeAll(async () => {
        return connection = await createTestConnection(entities);

    })

    afterAll(() => connection.close())

    return () => {
        getTestConnection = () => defined(connection, 'No command');
        return connection;
    }
}
