import { ExpressModuleTester } from "@dabsi/modules2/tests/ExpressModuleTester";
import express from "express";

const t = ExpressModuleTester.default();

beforeAll(async () => {
  t.app.post("/test-hello", express.json(), (req, res) => {
    res.send(`Hello ${req.body.name}!`);
  });
});

it("expect to make post-route.", async () => {
  expect(
    await t.axios.post("/test-hello", { name: "World" }).then(res => res.data)
  ).toEqual("Hello World!");
});
