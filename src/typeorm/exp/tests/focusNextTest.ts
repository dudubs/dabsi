let focusNext = false;
let debugNext = false;
let debugTest = false;
let currentSpecTitle = "";

const specTitleToFilter = {};

(d => {
    d("it", it);
    // d("fit", fit);

})
((method, func) => {

    global[method] = function (title, callback) {
        if (focusNext) {
            console.log(`focus next: ${currentSpecTitle + title}`);
        }
        let focused = focusNext;

        focusNext = false;

        const specFilter = specTitleToFilter[currentSpecTitle];


        if (specFilter) {
            focused = specFilter(title);
            if (focused) {
                console.log(`focus filter: ${currentSpecTitle + title}`);
            }
        }


        const it = (focused ? fit : func);
        if (debugNext) {
            const rcallback = callback;
            callback = () => {
                debugTest = true;
                return rcallback();
            }
        }

        it(title, callback);

        debugNext = false;
    }
});


(d => {
    d("describe", describe);
    d("fdescribe", fdescribe);
})
((name, func) => {

    global[name] = function (title, sepc) {
        const prevTitle = currentSpecTitle;
        currentSpecTitle += title + " ";

        return func.call(this, title, () => {
            sepc();
            currentSpecTitle = prevTitle;
        });
    }

});


afterEach(() => {
    debugTest = false;
})


export function focusNextTest() {
    focusNext = true;
}

export function debugNextTest<T>(callback: () => T): T
export function debugNextTest<T>(): boolean
export function debugNextTest<T>(callback?) {
    if (callback) {
        if (debugTest) return callback();
    } else {
        debugNext = true;
        return debugTest;
    }
}

export function focusTest(
    pattern: RegExp
) {

    console.log({focusTest: pattern});

    const prevFilter = specTitleToFilter[currentSpecTitle];

    specTitleToFilter[currentSpecTitle] = title =>
        (prevFilter ? prevFilter(title) : true) &&
        pattern.test(title);

}
