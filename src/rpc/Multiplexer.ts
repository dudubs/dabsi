import {AnyRpc, RpcError, RpcHandler} from "./Rpc";


type Result =
    { type: "error", reason: any }
    | { type: "result", value: any };

type Waiter = { resolve(result: any): void, reject(error): void };

export namespace Multiplexer {
    export function connection(handler: RpcHandler): RpcHandler {
        return async payload => {
            return handler(payload)
        }
    }
}

function multiplexer(handler: (payloads: any[]) => Promise<Result[]>) {

    let payloads: any[] = [];
    let waiters: Waiter[] = [];
    let timeout: any = null;

    return payload => {

        if (timeout !== null) {
            clearInterval(timeout);
            timeout = null;
        }

        let waiter: Waiter | undefined = undefined;
        const promise = new Promise((resolve, reject) => {
            waiter = {resolve, reject}
        });

        if (!waiter)
            throw new Error('No promise resolve')

        payloads.push(payload);
        waiters.push(waiter);

        timeout = setTimeout(async () => {

            timeout = null;
            const currentPayloads = payloads;
            const currentWaiters = waiters;
            [payloads, waiters] = [[], []];

            const results: Result[] = await handler(currentPayloads);
            for (const [index, result] of results.entries()) {
                const waiter = currentWaiters[index];
                switch (result.type) {
                    case "error":
                        waiter.reject(result.reason)
                        break;
                    case "result":
                        waiter.resolve(result.value)
                        break;
                }
            }

        }, 100);

        return promise
    }
}

function demultiplexer(handler: (payload: any) => Promise<any>) {
    return async (payloads: any[]): Promise<Result[]> => {
        const results: Result[] = [];
        for (const payload of payloads) {
            try {
                results.push({
                    type: "result", value:
                        await handler(payload)
                })
            } catch (error) {
                if (error instanceof RpcError) {
                    results.push({type: "error", reason: error.message})
                }
                throw error;
            }

        }
        return results;
    }
}

export function Multipelxer<T extends AnyRpc>(rpc: T): T {

    const {createRpcConnection, createRpcHandler} = rpc;


    rpc.createRpcConnection = function (handler: (payloads: any[]) => Promise<any[]>) {
        return createRpcConnection.call(this, multiplexer(handler))
    }

    rpc.createRpcHandler = function (config) {
        return demultiplexer(createRpcHandler.call(this, config))
    }

    return rpc;
}
