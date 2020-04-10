let counter = 0;
const run = new Date().getTime();

export function RandomId(p = "rm"/*RandomKey*/): string {
    return `${p}-${++counter}-${run}`;
}
