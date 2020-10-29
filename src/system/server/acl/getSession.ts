import crypto from "crypto";
import express from "express";
import { BasedType } from "../../../typedata/BaseType";
import { DataRow } from "../../../typedata/DataRow";
import { DataSource } from "../../../typedata/DataSource";
import { BasedDataSource } from "../../../typedata/DataSource/DataSource";
import { Session } from "./Session";

export async function getSession<T extends BasedType<Session>>({
  cookie,
  setCookie,
  source: _source,
}: {
  source: DataSource<T>;
  cookie: string | undefined;
  setCookie(value: string);
}): Promise<DataRow<T>> {
  let token = cookie && String(cookie);
  const source: BasedDataSource<Session> = <any>_source;

  let session = !token
    ? undefined
    : await source.filter({ $base: ["token", { $equals: token }] }).get();

  if (!session) {
    token = crypto.randomBytes(32).toString("base64");
    session = await source.insert({
      token,
      timeout: new Date().getTime(),
    });
    setCookie(token);
  } else {
    await session.update({ timeout: new Date().getTime() });
  }
  return session as any;
}
