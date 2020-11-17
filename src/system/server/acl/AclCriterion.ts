import { ExtractKeys } from "../../../common/typings2/ExtractKeys";
import { Type } from "../../../common/typings2/Type";
import { EmptyFragment } from "../../../react/utils/EmptyFragment";
import { BasedType, GetBaseType } from "../../../typedata/BaseType";
import { DataExp } from "../../../typedata/data-exp/DataExp";
import { DataCursor, EmptyDataCursor } from "../../../typedata/DataCursor";
import { BasedDataRow } from "../../../typedata/DataSourceRow";
import { DataEntitySource } from "../../../typedata/data-entity/DataEntitySource";
import {
  DataRelation,
  DataRelationToManyKeys,
  DataRelationToOneKeys,
  DataRelationType,
} from "../../../typedata/DataRelation";
import { Group } from "./Group";
import { User } from "./User";

export type AclRow<T> = BasedDataRow<T> | [Type<T>, string];
export type AclRowType<T extends AclRow<any>> = T extends AclRow<infer U>
  ? U
  : never;

export class AclCriterionExps {
  protected _isUsed = false;

  get isUsed(): boolean {
    return this._isUsed;
  }

  constructor(protected userKey: string) {}

  get user(): DataExp<BasedType<User>> {
    this._isUsed = true;
    return { $is: this.userKey };
  }

  get group(): DataExp<BasedType<Group>> {
    return { $has: { users: this.user } };
  }
}

export class AclCriterion<T> {
  static create<T extends AclRow<any>>(row: T): AclCriterion<AclRowType<T>> {
    if (Array.isArray(row)) {
      const [type, key] = row;
      return new AclCriterion(
        type,
        { ...EmptyDataCursor, filter: { $is: key } },
        undefined
      );
    }
    const source = (row as BasedDataRow<any>).getSource();
    if (!(source instanceof DataEntitySource))
      throw new Error(`Expect to ${DataEntitySource.name}.`);
    return new AclCriterion(source.entityType, source.cursor, undefined);
  }

  constructor(
    public entityType: Function,
    public cursor: DataCursor,
    public root: AclCriterion<any> | undefined
  ) {}

  getFilterRef?: (exp: AclCriterionExps) => DataExp<any>;

  getFilter(exps: AclCriterionExps): DataExp<any> {
    if (this.root) return this.root.getFilter(exps);
    return this.getFilterRef?.(exps);
  }

  createChild() {
    return new AclCriterion(this.entityType, this.cursor, this.root ?? this);
  }

  at<K extends DataRelationToOneKeys<T>>(
    propertyName: K
  ): AclCriterion<DataRelationType<T[K]>> {
    const child = this.createChild();

    this._filter(
      exps =>
        child.getFilterRef && {
          $at: { [propertyName]: child.getFilterRef(exps) },
        }
    );

    return child as any;
  }

  hasAt<K extends DataRelationToManyKeys<T>>(
    propertyName: K
  ): AclCriterion<DataRelationType<T[K]>> {
    const child = this.createChild();

    this._filter(
      exps =>
        child.getFilterRef && {
          $has: { [propertyName]: child.getFilterRef(exps) },
        }
    );

    return child as any;
  }

  protected _filter(callback: (exps: AclCriterionExps) => DataExp<any>): this {
    const { getFilterRef } = this;
    this.getFilterRef = exps => {
      return DataExp(getFilterRef?.(exps), callback(exps));
    };
    return this;
  }

  filter(
    callback: (
      $: (exp: DataExp<T>) => DataExp<T>,
      exps: AclCriterionExps
    ) => DataExp<T>
  ): this;

  filter(exp: DataExp<T>): this;

  filter(expOrCallback) {
    return this._filter(exps => {
      if (typeof expOrCallback === "function")
        return expOrCallback($ => $, exps);
      return expOrCallback;
    });
  }

  userIs<K extends ExtractKeys<T, DataRelation<User>>>(propertyName: K): this {
    return this._filter(({ user }) => ({
      $at: { [propertyName]: user },
    }));
  }

  hasUser<K extends ExtractKeys<T, DataRelation<User>[]>>(propertyName: K) {
    return this._filter(({ user }) => ({
      $has: { [propertyName]: user },
    }));
  }

  userGroupIs<K extends ExtractKeys<T, DataRelation<Group>>>(propertyName: K) {
    return this._filter(({ group }) => ({
      $at: { [propertyName]: group },
    }));
  }

  hasUserGroup<K extends ExtractKeys<T, DataRelation<Group>[]>>(
    propertyName: K
  ) {
    return this._filter(({ group }) => ({
      $has: { [propertyName]: group },
    }));
  }
}
