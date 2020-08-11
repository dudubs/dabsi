import {Response} from "express";
import {Awaitable} from "../common/typings";


export async function handleRpc(
    res: Response,
    callback: () => Awaitable
) {
    try {
        res.json({result: await callback()})
    } catch (error) {
        res.json({error});
    }
}

export function fetchRpc({error, result}: { error?, result? }) {
    if (error)
        throw error;
    return result;
}


