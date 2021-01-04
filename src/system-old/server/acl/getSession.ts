import { BasedType } from "@dabsi/typedata/BaseType";
import { DataRow } from "@dabsi/typedata/DataRow";
import { BasedDataSource, DataSource } from "@dabsi/typedata/DataSource";
import { generateSessionToken } from "@dabsi/system-old/server/acl/generateSessionToken";
import { Session } from "@dabsi/modules/session/entities/Session";

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
