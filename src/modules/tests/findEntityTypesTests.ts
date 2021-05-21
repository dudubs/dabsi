import { findEntityTypes } from "@dabsi/modules/findEntityTypes";
import { ChildEntity, Entity, ManyToOne, TableInheritance } from "typeorm";

@Entity()
@TableInheritance()
class A {}

@ChildEntity()
class SubA extends A {}

@ChildEntity()
class SubSubA extends SubA {}

@Entity()
class B {
  @ManyToOne(() => A)
  a!: A;
}

it("expect to find types by relation -> target", () => {
  const entityTypes = findEntityTypes([B]);
  expect(entityTypes).toContain(A);
  expect(entityTypes).toContain(SubA);
  expect(entityTypes).toContain(SubSubA);
  expect(entityTypes).toContain(B);
});

it("expect to find types by target-> relation", () => {
  const entityTypes = findEntityTypes([A]);
  expect(entityTypes).toContain(A);
  expect(entityTypes).toContain(SubA);
  expect(entityTypes).toContain(SubSubA);
  expect(entityTypes).toContain(B);
});
