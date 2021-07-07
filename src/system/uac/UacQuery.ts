import { isPromiseLike } from "@dabsi/common/async/isPromiseLike";
import { entries } from "@dabsi/common/object/entries";
import { capitalize } from "@dabsi/common/string/capitalize";
import { inspect } from "@dabsi/logging/inspect";
import { DataRowTicker } from "@dabsi/modules/data/DataRowTicker";
import { User } from "@dabsi/system/uac/entities/User";
import { DataQuery } from "@dabsi/typedata/query/exp";

export type UacPromisedQuery = PromiseLike<string | false | undefined | null>;

// aclQuery
export type UacQuery =
  | { $any: UacQuery[] }
  | { $all: UacQuery[] }
  | { $token: string }
  | { $promise: UacPromisedQuery }
  | string
  | UacPromisedQuery;

export class UacQueryRunner {
  constructor(readonly user: DataRowTicker<User>) {}

  protected _handleAny(query: UacQuery[]): Promise<string[]> {
    return Promise.all(query.map(query => this._handleQuery(query))).then(
      result => {
        const allReasons: string[] = [];
        for (const reasons of result) {
          if (!reasons.length) return [];
          allReasons.push(...reasons);
        }
        return allReasons;
      }
    );
  }

  protected _handleAll(query: UacQuery[]): Promise<string[]> {
    return Promise.all(
      query.map(query => this._handleQuery(query))
    ).then(result => result.flat());
  }

  protected _handleToken(token: string): Promise<string[]> {
    throw new Error("Not supported yet.");
  }

  protected async _handlePromise(promise: PromiseLike<any>): Promise<string[]> {
    const reason = await promise;
    return typeof reason === "string" ? [reason] : [];
  }

  protected async _handleQuery(query: UacQuery): Promise<string[]> {
    if (isPromiseLike(query)) {
      return this._handlePromise(query);
    }
    if (typeof query === "string") {
      return this._handleToken(query);
    }
    for (const [key, value] of entries(query as any)) {
      if (key.startsWith("$"))
        throw new Error(`Invalid acl-query-key "${key}".`);
      const handlerName = "_handle" + capitalize(key.slice(1));
      return this[handlerName](value) as Promise<string[]>;
    }
    throw new Error(`Invalid acl-query ${inspect(query)}.`);
  }

  async run(query: UacQuery): Promise<string[]> {
    return this._handleQuery(query);
  }
}
