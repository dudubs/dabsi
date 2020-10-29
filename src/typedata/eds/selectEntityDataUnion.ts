import { Type } from "../../common/typings";
import { DataSource } from "../DataSource";
import { EntityDataSource } from "./EntityDataSource";

async function unionEntityDataSource(
  getConnection,
  build: (getDs: <T>(type: Type<T>) => DataSource<T>) => DataSource<any>[],
  { limit = 0, offset = 0 }
) {
  const listDs = build(type => EntityDataSource.create(type, getConnection));

  const allParams: any[] = [];
  let allQuery = "";
  for (let ds of listDs) {
    const [query, params] = (ds as EntityDataSource<any>)
      .createEntityLoader()
      .qb.getQueryAndParameters();

    allParams.push(...params);
    allQuery = allQuery ? `${allQuery} UNION ${query}` : query;

    if (limit) {
      allQuery += ` LIMIT ${limit}`;
    }
    if (offset) {
      allQuery += ` OFFSET ${offset}`;
    }
  }

  return getConnection().query(allQuery, allParams);
}
