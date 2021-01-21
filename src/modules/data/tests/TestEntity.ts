import { BeforeInsert, Entity } from "typeorm";

export function TestEntity() {
  let count = 0;
  return (target: Function & { prototype: { id: string } }) => {
    const desc: PropertyDescriptor = {
      value(this: any) {
        this.id = `${this.constructor.name}-${++count}`;
      },
    };
    BeforeInsert()(target.prototype, "setTestEntityId");
    Object.defineProperty(target.prototype, "setTestEntityId", desc);
    Entity()(target);
  };
}
