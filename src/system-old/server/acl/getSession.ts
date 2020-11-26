import { BasedType } from "../../../typedata/BaseType";
import { DataRow } from "../../../typedata/DataRow";
import { BasedDataSource, DataSource } from "../../../typedata/DataSource";
import { generateSessionToken } from "./generateSessionToken";
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
    token = generateSessionToken();
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
