import {BSON2} from "../common/BSON2";

export function fetchBSON(url: string, data: any):Promise<any> {
    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/bson"
        },
        body: BSON2.pack(data)
    }).then(async res =>
        BSON2.unpack(
            Buffer.from(await res.arrayBuffer())
        )
    )
}
