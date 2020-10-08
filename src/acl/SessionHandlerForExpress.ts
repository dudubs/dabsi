import * as crypto from "crypto";
import * as express from "express";
import { BasedType } from "../data/BaseType";
import { DataRow } from "../data/DataRow";
import { DataSource } from "../data/DataSource";
import { GenericDataSource } from "../data/DataSource/DataSource";
import { Session } from "./Session";

export function SessionHandlerForExpress<T extends BasedType<Session>>({
  cookieName,
  source: _source,
}: {
  source: DataSource<T>;
  cookieName: string;
}) {
  return (
    callback: (session: DataRow<T>) => express.Handler
  ): express.Handler => async (req, res, next) => {
    let token: string = req.cookies[cookieName];
    const source: GenericDataSource<Session> = <any>_source;

    let session = !token
      ? undefined
      : await source.filter({ $base: ["token", { $equals: token }] }).get();

    if (!session) {
      token = crypto.randomBytes(32).toString("base64");
      session = await source.insert({
        token,
        timeout: new Date().getTime(),
      });
      res.cookie(cookieName, token);
    } else {
      await session.update({ timeout: new Date().getTime() });
    }
    return callback(session as any)(req, res, next);
  };
}
