export function toPromise<T>(callback: (callback: (err, result?: T) => void) => void):Promise<T> {
    return new Promise(((resolve, reject) => {
        callback((error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        })
    }))
}