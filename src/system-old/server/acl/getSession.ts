import { BasedType } from "@dabsi/typedata/BaseType";
import { DataRow } from "@dabsi/typedata/row";
import { BasedDataSource, DataSource } from "@dabsi/typedata/source";
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
  let sessionKey: string | null = null;
  let sessionToken: string | null = null;
  try {
    [sessionKey, sessionToken] = cookie && JSON.parse(cookie);
  } catch (error) {}

  const source: BasedDataSource<Session> = <any>_source;

  let session =
    typeof sessionToken === "string" &&
    typeof sessionKey === "string" &&
    sessionKey &&
    sessionToken
      ? await source
          .filter({
            $and: [
              { $is: sessionKey },
              { $base: ["token", { $equals: sessionToken }] },
            ],
          })
          .get()
      : undefined;

  if (!session) {
    sessionToken = generateSessionToken();
    session = await source.insert({
      token: sessionToken,
      timeout: new Date().getTime(),
    });
    setCookie(JSON.stringify([session.$key, sessionToken]));
  } else {
    await session.update({ timeout: new Date().getTime() });
  }
  return session as any;
}
