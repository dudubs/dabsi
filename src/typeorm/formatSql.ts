import sqlFormatter from "sql-formatter";
export default function formatSql(sql: string) {
  return sqlFormatter.format(sql);
}
