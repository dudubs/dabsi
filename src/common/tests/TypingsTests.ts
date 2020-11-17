import { HasKeys, IsAny, IsUndefined } from "../typings2/boolean";
import { Is } from "../typings2/boolean/Is";
import { IsEmptyObject } from "../typings2/boolean/IsEmptyObject";
import { IsNever } from "../typings2/boolean/IsNever";
import { IsSome } from "../typings2/boolean/IsSome";
import { OptionalKeys } from "../typings2/OptionalKeys";
import { OptionalObjectArg } from "../typings2/OptionalObjectArg";
import { PartialUndefinedKeys } from "../typings2/PartialUndefinedKeys";
import { Pluck } from "../typings2/Pluck";
import { RequireOptionalKeys } from "../typings2/RequireOptionalKeys";

(_ => {})(() => {
  // Bool
  {
    // @ts-expect-error
    test<false & true>(false);

    test<false | true>(false);

    test<false | true>(true);
  }
  // IsUndefined
  {
    test<IsUndefined<undefined & undefined>>(true);

    // @ts-expect-error
    test<IsUndefined<undefined & never>>(true);
  }

  // IsEmptyObject
  {
    type n = number;

    test<IsEmptyObject<{ a?: n }>>(true);

    test<IsEmptyObject<{ a?: n } | { a: n }>>(true);

    test<IsEmptyObject<{ a: n }>>(false);

    test<IsEmptyObject<{ a: n } | {}>>(true);

    test<IsEmptyObject<{ a: n } | { a?: n }>>(true);

    test<IsEmptyObject<{ a: n } | { a?: n } | undefined>>(true);
  }

  // PartialUndefinedKeys
  {
    test<PartialUndefinedKeys<PartialUndefinedKeys<{ a?: number; b: number }>>>(
      { b: 1 }
    );

    test<PartialUndefinedKeys<PartialUndefinedKeys<{ a?: number; b: number }>>>(
      // @ts-expect-error
      {}
    );

    test<PartialUndefinedKeys<PartialUndefinedKeys<{ a?: number; b: number }>>>(
      {
        b: 1,
        // @ts-expect-error
        c: 1,
      }
    );
  }
  // Is
  {
    const undefinedIsUndefined: Is<undefined, undefined> = true;

    const undefinedIsUndefinedOrNumber: Is<
      undefined,
      undefined | number
    > = true;

    const undefinedIsUndefinedOrNever: Is<undefined, undefined | never> = true;

    const undefinedIsUndefinedOrUnkown: Is<
      undefined,
      undefined | unknown
    > = true;

    const neverIsNever: Is<never, never> = true;

    const neverIsUnkown: Is<never, unknown> = true;

    const neverIsAny: Is<never, any> = true;

    // @ts-expect-error
    const unknownIsNever: Is<unknown, never> = true;

    const unknownIsUnkown: Is<unknown, unknown> = true;

    const unknownIsAny: Is<unknown, any> = true;

    // @ts-expect-error
    const anyIsNever: Is<any, never> = true;

    const anyIsUnkown: Is<any, unknown> = true;

    const anyIsAny: Is<any, any> = true;
  }

  // IsSome
  {
    const neverIsNever: IsSome<never, never> = true;

    // @ts-expect-error
    const neverIsUnkown: IsSome<never, unknown> = true;

    // @ts-expect-error
    const neverIsAny: IsSome<never, any> = true;

    // @ts-expect-error
    const unknownIsNever: IsSome<unknown, never> = true;

    const unknownIsUnkown: IsSome<unknown, unknown> = true;

    const unknownIsAny: IsSome<unknown, any> = true;

    // @ts-expect-error
    const anyIsNever: IsSome<any, never> = true;

    const anyIsUnkown: IsSome<any, unknown> = true;

    const anyIsAny: IsSome<any, any> = true;
  }

  // RequireOptionalKeys
  {
    test<RequireOptionalKeys<{ foo?: string }>>({ foo: "" });

    test<RequireOptionalKeys<{ foo?: string }>>({ foo: undefined });

    // @ts-expect-error
    test<RequireOptionalKeys<{ foo: string }>>({ foo: undefined });

    // @ts-expect-error
    test<RequireOptionalKeys<{ foo?: string }>>({});
  }

  // OptionalKeys
  {
    // @ts-expect-error
    test<OptionalKeys<{ foo; bar? }>>("foo");

    test<OptionalKeys<{ foo; bar? }>>("bar");
  }

  // HasKeys
  {
    test<HasKeys<never>>(false);
    // @ts-expect-error
    test<HasKeys<never>>(true);

    test<HasKeys<{}>>(false);
    // @ts-expect-error
    test<HasKeys<{}>>(true);

    test<HasKeys<{ a }>>(true);
    // @ts-expect-error
    test<HasKeys<{ a }>>(false);
  }

  // OptionalObjectArg
  {
    test<OptionalObjectArg<never>>([]);

    test<OptionalObjectArg<{ x: never }>>([]);

    test<OptionalObjectArg<{ x: never; y: number }>>([{ y: 1 }]);
  }
  // Pluck
  {
    test<IsNever<Pluck<never, "">>>(true);
  }

  // IsAny
  {
    test<IsAny<any>>(true);

    test<IsAny<unknown>>(false);

    test<IsAny<never>>(false);

    test<IsAny<string>>(false);

    test<IsAny<object>>(false);

    test<IsAny<{}>>(false);
  }
  // IsNever
  {
    test<IsNever<any>>(false);
    test<IsNever<undefined>>(false);
    test<IsNever<null>>(false);
    test<IsNever<unknown>>(false);

    test<IsNever<never>>(true);

    // @ts-expect-error
    test<IsNever<any>>(true);

    // @ts-expect-error
    test<IsNever<undefined>>(true);

    // @ts-expect-error
    test<IsNever<null>>(true);

    // @ts-expect-error
    test<IsNever<unknown>>(true);
  }
  // HasKeys
  {
    test<HasKeys<{}>>(false);

    // @ts-expect-error
    test<HasKeys<{}>>(true);
  }
});

declare function test<T>(value: T, callback?: (value: T) => void): T;
