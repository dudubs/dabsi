export function _testm(
    fileName: string,
    callback: () => void
) {

    describe(fileName.match(/[^\\\/]+$/)?.[0] ?? fileName, callback);
}
