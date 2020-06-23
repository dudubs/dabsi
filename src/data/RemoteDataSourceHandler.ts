import {Handler} from "express";
import {handleRPC} from "../rpc/RPCHandler";
import {DataSource} from "./DataSource";

export function RemoteDataSourceHandler<T>(
    source: DataSource<T>
): Handler {
    return ({body: action}, res) => {
        return handleRPC(res, async () => {
            // @ts-ignore
            return RemoteDataSourceHandler.handle(source, action.cursor, action.method, action.params);
        })
    }
}

RemoteDataSourceHandler.handle = function (
    source, cursor, method, params
) {
    return source.withCursor(cursor)[method](params)
};
