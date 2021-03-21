import { Awaitable } from "@dabsi/common/typings2/Async";
import { Session } from "@dabsi/modules/session/entities/Session";
import { generateSessionToken } from "@dabsi/system-old/server/acl/generateSessionToken";
import { BasedType } from "@dabsi/typedata/BaseType";
import { DataRow } from "@dabsi/typedata/row";
import { DataSource } from "@dabsi/typedata/source";

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

  const source: DataSource.Based<Session> = <any>_source;

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

export async function getSessionKey({
  cookie,
  setCookie,
  source,
}: {
  source: DataSource<Session>;
  cookie: string | undefined;
  setCookie(value: string);
}): Promise<[string, string | null]> {
  let sessionKey: string | null = null;
  let sessionToken: string | null = null;
  try {
    [sessionKey, sessionToken] = cookie && JSON.parse(cookie);
  } catch (error) {}

  if (
    typeof sessionToken === "string" &&
    typeof sessionKey === "string" &&
    sessionKey &&
    sessionToken
  ) {
    const session = await source
      .filter({
        $and: [{ $is: sessionKey }, ["token", { $equals: sessionToken }]],
      })
      .select({ relations: { user: { pick: [] } } })
      .get();

    if (session) {
      // TODO: update on request cleanup.
      return [sessionKey, session.user?.$key || null];
    }
  }

  sessionToken = generateSessionToken();
  sessionKey = await source.insertKey({
    token: sessionToken,
    timeout: new Date().getTime(),
  });

  setCookie(JSON.stringify([sessionKey, sessionToken]));

  return [sessionKey, null];
}
