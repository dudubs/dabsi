import {HasKeys, IsNever, Pluck} from "../typings";

((_) => {
})(() => {


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
    // Pluck
    {
        test<IsNever<Pluck<never, "">>>(true);

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

