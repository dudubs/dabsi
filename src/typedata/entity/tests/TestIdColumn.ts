import { WeakId } from "@dabsi/common/WeakId";
import { BeforeInsert, PrimaryColumn } from "typeorm";

export default function (): PropertyDecorator {
  return <K extends string>(target: Record<K, string>, propertyName: K) => {
    const methodName = propertyName + "BeforeInsert";
    target[methodName] = function (this: any) {
      this[propertyName] = this.constructor.name + "-" + WeakId(this);
    };

    PrimaryColumn()(target, propertyName);
    BeforeInsert()(target, methodName);
  };
}
