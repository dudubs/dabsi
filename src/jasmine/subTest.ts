import {catchSpecFailExpectations} from "./catchSpecFailExpectations";

export function subTest<T>(desc: string, callback: () => void): void {
    const fails = catchSpecFailExpectations();
    try {
        return callback();
    } finally {
        fails().forEach(fail => {
            fail.message = desc + " " + fail.message;
        })
    }
}
