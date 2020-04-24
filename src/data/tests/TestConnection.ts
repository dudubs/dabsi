import {Connection, createConnection, ObjectType} from "typeorm";
import {defined} from "../../common/object/defined";

export let getTestConnection: () => Connection;


let counter = 0;

export function createTestConnection(entities: ObjectType<any>[]): Promise<Connection> {
    return createConnection({
        name: 'testConnection' + (++counter),
        type: "sqlite",
        database: ":memory:",
        synchronize: true,
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
        getTestConnection = () => defined(connection, 'No connection');
        return connection;
    }
}
