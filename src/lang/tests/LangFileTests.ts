import {entries} from "@dabsi/common/object/entries";
import {isEmptyObject} from "@dabsi/common/object/isEmptyObject";
import {split} from "@dabsi/common/string/split";
import {LangMap} from "@dabsi/lang/LangMap";
import arrayContaining = jasmine.arrayContaining;
import objectContaining = jasmine.objectContaining;

testm(__filename,()=>{

    type Item = {
        lines: string[],
        keys: Record<string, Item>
    }


    function* parseBlocks(lines: Iterable<string>): IterableIterator<[number, string]> {
        const blocks = [''];
        let lineNumber = 0;
        for (const line of lines) {
            lineNumber++;
            const trimmedLine = line.trimStart();
            const block = line.slice(0, line.length - trimmedLine.length);
            if (!trimmedLine.length)
                continue;
            const currentBlock = blocks[blocks.length - 1];
            if (block.length > currentBlock.length) {
                blocks.push(block);
                yield [1, trimmedLine]
            } else if (block.length < currentBlock.length) {
                const blockIndex = blocks.findIndex(b => b === block);
                if (0 > blockIndex)
                    throw new Error(`Invalid block shifting ${lineNumber}.`)
                const count = blockIndex - blocks.length + 1
                blocks.length = blockIndex + 1;
                yield [count, trimmedLine]
            } else if (block !== currentBlock) {
                throw new Error(`Invalid block characters ${lineNumber}`)
            } else {
                yield [0, trimmedLine]
            }
        }
    }

    class TreeMap<T> {
        values: T[] = [];
        children: Record<string, TreeMap<T>> = {};


        hasChildren() {
            return !isEmptyObject(this.children)
        }

        hasValues() {
            return this.values.length > 0;
        }

        get(keys: string[]): T[] | undefined {
            return this.getMap(keys)?.values
        }

        getMap(keys: string[], end = keys.length, start = 0): TreeMap<T> | undefined {
            if (start === end)
                return this;
            return this.children[keys[start]]?.getMap(keys, end, start + 1);
        }

        log(shifting = '', shift = '\t') {
            for (let value of this.values) {
                console.log(`${shifting}"${value}"`);
            }
            for (let [key, table] of entries(this.children)) {
                console.log(`${shifting}"${key}"`);
                table.log(shifting + shift, shift);
            }
        }
    }

    function parseTreeMapFromText(text: string) {
        let keys: any[] = [undefined];
        const map = new TreeMap<string>();
        for (let [shifting, value] of parseBlocks(split(text, '\n'))) {
            if (shifting === 1) {
                keys.push(value);
            } else if (0 >= shifting) {
                set();
                keys.length += shifting;
                keys[keys.length - 1] = value;
            }
        }

        set();
        return map;

        function set() {
            if (typeof keys[0] !== "string")
                return;
            let currentMap = map;
            const lastKeyIndex = keys.length - 1;
            for (let index = 0; lastKeyIndex > index; index++) {
                const key = keys[index].trimEnd();

                currentMap = currentMap.children[key] ?? (
                    currentMap.children[key] = new TreeMap()
                );
            }
            currentMap.values.push(keys[lastKeyIndex])

        }
    }

    function buildLangMapFromText(text: string, langMap: LangMap) {
        const treeMap = parseTreeMapFromText(text);
        buildLangMapFromTreeMap(treeMap, langMap)
    }

    function buildLangMapFromTreeMap(
        treeMap: TreeMap<string>,
        baseLangMap: LangMap) {

        const langMap = Object.setPrototypeOf({}, baseLangMap);

        for (let value of treeMap.values) {
            baseLangMap[value] = value;
        }

        for (let [key, childMap] of entries(treeMap.children)) {

            const parts = key.split('*');

            // optimization
            const hasParams = key.indexOf('{') > -1


            if (parts.length === 1) {
                if (!childMap.hasChildren()) {

                }
                continue;
            }

            let text = '';
            for (let line of childMap.values) {

            }

            const args = {};

            for (let [key, subChildMap] of entries(childMap.children)) {
                if (key.startsWith("@")) {
                    args[key] = buildLangMapFromTreeMap(
                        subChildMap,
                        langMap
                    )
                }
            }

        }

        return baseLangMap;

    }

    const langMap = {};


    function formatTemplate(
        template: string,
        props: object
    ) {
        return template.replace(/\{([\w+]+)\}/ig, (s, x) => props[x] ?? s)
    }

    it('dev', () => {
        expect(formatTemplate('Hello {name}!', {name: "World"}))
            .toEqual('Hello World!');
        expect(formatTemplate('Hello {name}!', {}))
            .toEqual('Hello {name}!');
    })
    beforeAll(() => {


        buildLangMapFromText(`
    
FOO
    
HELLO
    Hello

HELLO_{name}    
    Hello {name}!
    
*_{name}
    @msg
        HELLO
            Hello
        BYE
            Bye
    @msg {name}!
    
REQUIRED
    Required
    
REQUIRED_*_{length}_*
    @count
        LESS_THAN
            less than <
        MORE_THAN
            more than >
    @type
        WORDS
        CHARACTERS
       
    $REQUIRED @count {length} @type!
    
    `, langMap);

    });


    it('parseTreeMapFromText', () => {

        const map = parseTreeMapFromText(`
    
A
    AA
    AB 
        ABA
            ABAA with whitespace in the end 
            ABAB
                ABABA
            ABAC
        ABB
            ABBA
    AC
        ACA
B

C

D
E
    
    `);


        expect(map).toEqual(
            mapContaining(["B", "C", "D", "E"], {
                A: mapContaining(["AA"], {
                    AB: mapContaining([], {
                        ABA: mapContaining(["ABAA with whitespace in the end ",
                            "ABAC"], {
                            ABAB: mapContaining(["ABABA"])
                        }),
                        ABB: mapContaining(["ABBA"]),
                    }),
                    AC: mapContaining(["ACA"])
                })
            })
        );

        function mapContaining(values: string[] = [], children = {}) {
            return jasmine.objectContaining({
                values: jasmine.arrayContaining(values),
                children: jasmine.objectContaining(children)
            })
        }
    })

})
