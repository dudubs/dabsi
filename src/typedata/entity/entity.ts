export type DataEntityOptions = {
  primaryKeys: Record<string, (value: any) => any>;
};

export function DataEntity<
  PrimaryKeys extends Record<string, (value: any) => string | number> = {
    id: typeof String;
  }
>(
  options: {
    primaryKeys?: PrimaryKeys;
  } = {}
): {
  new (): any;
} {
  class _Entity {}

  return _Entity as any;
}

class TestA extends DataEntity() {}
