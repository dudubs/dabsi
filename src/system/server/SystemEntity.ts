import { JoinTable, ManyToMany } from "typeorm";
import { Relation } from "../../typedata/Relation";
import { Owner } from "./acl/Owner";

export function SystemEntity<WithOwners extends boolean = false>({
  withOwners,
}: {
  withOwners?: WithOwners;
} = {}): new () => {
  id: number;
} & WithOwners extends false
  ? {}
  : { owners: Relation<Owner>[] } {
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
