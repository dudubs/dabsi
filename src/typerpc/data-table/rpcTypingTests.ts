import { Expect } from "@dabsi/common/typings2/Expect";
import { BaseType } from "@dabsi/typedata/BaseType";
import { DataTable, TDataTable } from "@dabsi/typerpc/data-table/rpc";

type Row = {
  name: string;
  countFields: number;
};

type T = Expect<
  TDataTable,
  {
    Row: {
      onlyRow: string;
      common: string;
      diffentType: string;
      dataIsUndefined: string;
      rowIsUndefined: string | undefined;
      based: string;
      notBased: string;
    };
    Data: {
      onlyData: string;
      common: string;
      diffentType: number;
      dataIsUndefined: string | undefined;
      rowIsUndefined: string;
    } & BaseType<{
      based: string;
    }>;
  }
>;

type IsOptionalColumnTests = [
  //
  Expect<DataTable.IsOptionalColumn<T, "common">, true>,

  Expect<DataTable.IsOptionalColumn<T, "rowIsUndefined">, true>,

  Expect<DataTable.IsOptionalColumn<T, "diffentType">, false>,

  Expect<DataTable.IsOptionalColumn<T, "dataIsUndefined">, false>,

  Expect<DataTable.IsOptionalColumn<T, "onlyRow">, false>,

  Expect<DataTable.IsOptionalColumn<T, "notBased">, false>,

  Expect<DataTable.IsOptionalColumn<T, "based">, true>
];
