import {catchSpecFailExpectations} from "./catchSpecFailExpectations";

// TODO: subAsyncTest

export function subTest<T>(desc: string, callback: () => Promise<void>): Promise<void>
export function subTest<T>(desc: string, callback: () => void): void
export function subTest(desc, callback) {

    const getFails = catchSpecFailExpectations();
    let result;
    try {
        result = callback();
    } catch (e) {
        addToFails();
        throw e;
    }


    if (result && (typeof result.then === "function")) {
        return Promise.resolve(result).finally(() => {
            addToFails();
        })
    } else {
        addToFails();
    }

    function addToFails() {
        getFails().forEach(fail => {
            fail.message = desc + " " + fail.message;
        })
    }
}
