import {IfNever} from "../typings";


test(() => {
    test<IfNever<never, false>>() === false;

    // @ts-expect-error
    test<IfNever<never, false>>() === true;


    function test<T>(): T {
        throw new Error()
    }

})

function test(callback) {


}
