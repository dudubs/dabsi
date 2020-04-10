export function attachCallback<T extends (...args) => void>(...callbacks: (T | undefined)[]): T {
    // @ts-ignore
    return ((...args) => {
        for (const callback of callbacks) {
            callback?.(...args);
        }
    })
}
