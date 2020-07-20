import {catchSpecFailExpectations} from "./catchSpecFailExpectations";

export function subTest<T>(desc: string, callback: () => Promise<void>): Promise<void>
export function subTest<T>(desc: string, callback: () => void): void
export async function subTest(desc, callback) {

    const fails = catchSpecFailExpectations();
    try {
        return await callback();
    } finally {
        fails().forEach(fail => {
            fail.message = desc + " " + fail.message;
        })
    }
}
