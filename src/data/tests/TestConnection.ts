import {Connection, createConnection, ObjectType} from "typeorm";
import {defined} from "../../common/object/defined";


let counter = 0;


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
        connection = await createTestConnection(entities);
    })

    afterAll(async () => {
        await connection.close();
    })

    return () => {
        return defined(connection, 'No connection');
    }
}
