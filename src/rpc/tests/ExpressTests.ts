import * as express from "express";
import {Handler, Request} from "express";
import * as http from "http";
import fetch, {RequestInit} from "node-fetch";
import {toPromise} from "../../common/async/toPromise";
import {Awaitable} from "../../common/typings";

const _fetch = fetch;

let app: express.Application;
let server: http.Server;
let _handler: express.Handler;
let _url: string;

beforeAll(async () => {
    app = express();

    app.use(express.json())

    app.use((req, res, next) => {
        return _handler(req, res, next)
    });


    await toPromise(callback => {
        server = app.listen(callback);
        const addr = app.listen(callback).address();
        _url = `http://[::]:${addr?.['port']}`

    })

});

afterAll(() => {
    server?.close()
})

type ExpressTesterRequest = RequestInit & { url?: string };

export function testExpressHandler(handler: Handler) {
    return ({url, ...init}: ExpressTesterRequest) => {
        _handler = handler;
        return fetch(_url + (url ?? ""), init)
    }
}


export namespace ExpressTester {


    export function setExpressHandler(handler: express.Handler) {
        _handler = handler;
        return ExpressTester;
    }

    export function fetch({url, ...init}: ExpressTesterRequest = {}) {
        return _fetch(_url + (url ?? ""), init)
    }


    export function fetchJSON(body, init: ExpressTesterRequest = {}) {
        return fetch({
            ...init,
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                ...init.headers,
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
    }

    export function test(init: ExpressTesterRequest, handler: express.Handler) {
        _handler = handler;
        return fetch(init);
    }


    export function testText(
        init: ExpressTesterRequest,
        handler: (req: Request) => Awaitable<string>
    ) {
        return test(init, async (req, res) => {
            res.send(await handler(req))
        }).then(res => res.text())
    }
}

testm(__filename,()=>{

    it('testExpressText', async () => {
        expect(await ExpressTester.testText({}, () => "hello!"))
            .toEqual("hello!");
    })

})
