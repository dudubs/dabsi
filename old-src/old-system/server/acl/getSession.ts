import { Session } from "@dabsi/modules/session/entities/Session";
import { generateSessionToken } from "@dabsi/modules/session/generateSessionToken";
import { DataSource } from "@dabsi/typedata/source";

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
      .fetch();

    if (session) {
      // TODO: update on request cleanup.
      return [sessionKey, session.user?.$key || null];
    }
  }

  sessionToken = generateSessionToken();
  sessionKey = await source.insert({
    token: sessionToken,
    timeout: new Date().getTime(),
  });

  setCookie(JSON.stringify([sessionKey, sessionToken]));

  return [sessionKey, null];
}
