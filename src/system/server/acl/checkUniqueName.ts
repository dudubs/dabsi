import { ExtractKeys } from "../../../common/typings2/ExtractKeys";
import { BasedType } from "../../../typedata/BaseType";
import { DataExp } from "../../../typedata/data-exp/DataExp";
import { DataSource } from "../../../typedata/DataSource";

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
      .hasRow()
  ) {
    return "ALREADY_EXISTS" as const;
  }
}
