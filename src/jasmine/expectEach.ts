import {subTest} from "./subTest";

export function expectEach<T>(iterable: Iterable<T>, callback: (item: T, index: number) => void): void {
    let length = 0;
    for (const item of iterable) {
        const index = length++;
        subTest(`At item #${index}: `, () => {
            return callback(item, index)
        })
    }
}
