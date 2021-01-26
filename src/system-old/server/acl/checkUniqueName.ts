import { ExtractKeys } from "@dabsi/common/typings2/ExtractKeys";
import { BasedType } from "@dabsi/typedata/BaseType";
import { DataExp } from "@dabsi/typedata/data-exp/DataExp";
import { DataSource } from "@dabsi/typedata/DataSource";

export async function checkUniqueName<T>(
  source: DataSource<BasedType<T>>,
  field: ExtractKeys<T, string | undefined>,
  name: string | null,
  currentName?: string
) {
  if (!name || name === currentName) return;
  if (
    await source
      .filter({ $base: { [field]: name } } as DataExp<BasedType<T>>)
      .hasRows()
  ) {
    return "ALREADY_EXISTS" as const;
  }
}
