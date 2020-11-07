import sqlFormatter from "sql-formatter";
export function formatSql(sql: string) {
  return sqlFormatter.format(sql);
}
