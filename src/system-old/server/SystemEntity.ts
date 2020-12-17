import { JoinTable, ManyToMany } from "typeorm";
import { DataRelation } from "@dabsi/typedata/DataRelation";
import { Owner } from "@dabsi/system-old/server/acl/Owner";

export function SystemEntity<WithOwners extends boolean = false>({
  withOwners,
}: {
  withOwners?: WithOwners;
} = {}): new () => {
  id: number;
} & WithOwners extends false
  ? {}
  : { owners: DataRelation<Owner>[] } {
  class Base {}

  withOwners &&
    Reflect.decorate(
      [
        ManyToMany(() => Owner) as PropertyDecorator,
        JoinTable() as PropertyDecorator,
      ],
      Base,
      "owners"
    );

  return Base as any;
}
