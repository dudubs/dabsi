export function singleCall<T extends object>(callback: () => T): () => T {
    let value;
    return () => {
        return value ?? (value = callback());
    }
}



