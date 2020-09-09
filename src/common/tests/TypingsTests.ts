import {
    HasKeys,
    IsAny,
    IsEmptyObject,
    IsNever,
    IsSome,
    OptionalKeys,
    OptionalObjectArg,
    PartialUndefinedKeys,
    Pluck,
    RequireOptionalKeys
} from "../typings";


((_) => {
})(() => {


    // IsEmptyObject
    {
        type n = number;


        test<IsEmptyObject<{ a?: n }>>(true);

        test<IsEmptyObject<{ a?: n } | { a: n }>>(true);

        test<IsEmptyObject<{ a: n }>>(false);

    }
    // PartialUndefinedKeys
    {

        test<PartialUndefinedKeys<PartialUndefinedKeys<{ a?: number, b: number }>>>({b: 1});

        // @ts-expect-error
        test<PartialUndefinedKeys<PartialUndefinedKeys<{ a?: number, b: number }>>>({});

        // @ts-expect-error
        test<PartialUndefinedKeys<PartialUndefinedKeys<{ a?: number, b: number }>>>({b: 1, c: 1});
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
        test<RequireOptionalKeys<{ foo?: string }>>({foo: ""});

        test<RequireOptionalKeys<{ foo?: string }>>({foo: undefined});

        // @ts-expect-error
        test<RequireOptionalKeys<{ foo: string }>>({foo: undefined});

        // @ts-expect-error
        test<RequireOptionalKeys<{ foo?: string }>>({});
    }

    // OptionalKeys
    {
        // @ts-expect-error
        test<OptionalKeys<{ foo, bar? }>>("foo");

        test<OptionalKeys<{ foo, bar? }>>("bar");
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

        test<OptionalObjectArg<{ x: never, y: number }>>([{y: 1}]);

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

