import { BSON2 } from "../../common/BSON2";
import { ExpressTester, testExpressHandler } from "../../typerpc/ExpressTester";
import { ExpressBSON } from "../ExpressBSON";

export namespace ExpressBSONTester {
  export function fetch(data, url?) {
    return ExpressTester.fetch({
      url,
      method: "POST",
      headers: {
        "Content-Type": "application/bson",
      },
      body: BSON2.pack(data),
    })
      .then(res => res.arrayBuffer())
      .then(arrayBuffer => BSON2.unpack(Buffer.from(arrayBuffer)));
  }
}

export function testBSONHandler(callback) {
  return (data?) =>
    testExpressHandler((req, res) => {
      return ExpressBSON()(req, res, async () => {
        res.json(await callback(req.body));
      });
    })({
      method: "POST",
      headers: {
        "Content-Type": "application/bson",
      },
      body: BSON2.pack(data),
    }).then(async res => {
      return BSON2.unpack(Buffer.from(await res.arrayBuffer()));
    });
}

testm(__filename, () => {
  it("expected to regexp from server", async () => {
    expect(await testBSONHandler(() => /hello/)()).toBeInstanceOf(RegExp);
  });

  it("expected to regexp to server", async () => {
    expect(await testBSONHandler(data => data)(/hello/)).toBeInstanceOf(RegExp);
  });
});
