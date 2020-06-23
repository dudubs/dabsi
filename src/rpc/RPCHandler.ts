import {Response} from "express";
import {Awaitable} from "../common/typings";


export async function handleRPC(
    res: Response,
    callback: () => Awaitable
) {
    try {
        res.json({result: await callback()})
    } catch (error) {
        res.json({error});
    }
}

export function fetchRPC({error, result}: { error?, result? }) {
    if (error)
        throw error;
    return result;
}


