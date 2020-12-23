import { DataSource } from "@dabsi/typedata/DataSource";
import { Type } from "@dabsi/common/typings2/Type";
import { Resolver } from "../../typedi/Resolver";

export default Resolver<<T>(entityType: Type<T>) => DataSource<T>>();

// DataSystemModule
// CoreSystemModule
