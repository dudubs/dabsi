export function Immediate() {
    return new Promise(resolve => {
        setImmediate(resolve);
    })
}
