import {BSON2} from "../../common/BSON2";
import {testExpressHandler} from "../../rpc/tests/ExpressTests";
import {ExpressBSON} from "../ExpressBSON";

export function testBSONHandler(callback) {
    return (data?) => testExpressHandler(
        (req, res) => {
            return ExpressBSON()(req, res, async () => {
                res.json(await callback(req.body))
            })
        }
    )({
        method: "POST",
        headers: {
            "Content-Type": "application/bson"
        },
        body: BSON2.pack(data)
    }).then(async res => {
        return BSON2.unpack(Buffer.from(await res.arrayBuffer()))
    })
}

it('expect to regexp from server', async () => {
    expect(await testBSONHandler(() => /hello/)()).toBeInstanceOf(
        RegExp
    );
});

it('expect to regexp to server', async () => {
    expect(await testBSONHandler(data => data)(/hello/)).toBeInstanceOf(
        RegExp
    );
});
