import {basename, join} from "path";
import {
    CompilerOptions,
    createCompilerHost,
    createProgram,
    DiagnosticMessageChain,
    getPreEmitDiagnostics
} from "typescript";
import {hook} from "../../common/object/hook";
import {ExpressTester} from "../../rpc/tests/ExpressTests";

let counter = 0;

export class TypeScriptTester {

    virtualFiles = {};

    constructor(
        public dirName,
    ) {
        beforeAll(() => {
            const compilerOptions: CompilerOptions = {
                noEmit: true,
                downlevelIteration: true,
            };

            const compilerHost = createCompilerHost(compilerOptions);

            hook(compilerHost, 'fileExists', (prev, [fileName]) => {
                return (fileName in this.virtualFiles) || prev(fileName);
            })
            hook(compilerHost, 'readFile', (prev, [fileName]) => {
                const code = this.virtualFiles[fileName];

                if (typeof code === "string")
                    return code;
                return prev(fileName)
            })

            const program = createProgram({
                rootNames: Object.keys(this.virtualFiles),
                host: compilerHost,
                options: compilerOptions,
            });


            for (let diagnostic of getPreEmitDiagnostics(program)) {
                if (!diagnostic.file) {
                    console.log({diagnosticMessageText: diagnostic.messageText});
                }
                const fileName = diagnostic.file?.fileName;
                if (fileName && (fileName in this.virtualFiles)) {
                    this.fileNameToMessageText[fileName] = diagnostic.messageText;
                }

            }

        })
    }


    fileNameToMessageText: Record<string, string | DiagnosticMessageChain> = {};


    createVirtualFile(code: string) {
        const virtualFileName = join(this.dirName, `typings-tests-${counter++}.ts`)
            .replace(/\\/g, '/');
        this.virtualFiles[virtualFileName] = code;
        return virtualFileName;
    }


    expectToBeInvalid(code: string, globalCode = "") {
        const fileName = this.createVirtualFile(globalCode + code);
        it(code, () => {
            if (!this.fileNameToMessageText[fileName]) {
                fail(`expected to be invalid.`)
            }
        })
    }


    expectToBeValid(code: string, globalCode = "") {
        const fileName = this.createVirtualFile(globalCode + code);
        it(code, () => {
            const msg = this.fileNameToMessageText[fileName];
            if (msg) {
                fail(`expected to be valid: ${msg['messageText']??msg}`)
            }
        });
        return fileName;
    }

    sub(getCode, callback: (tester: TypeScriptSubTester) => void) {
        const tester = new TypeScriptSubTester(this, getCode);
        callback?.(tester);
        return tester
    }

    scope(getCode, callback) {
        callback({
            expectToBeValid: code =>
                this.expectToBeValid(getCode(code)),
            expectToBeInvalid: code =>
                this.expectToBeInvalid(getCode(code)),
            scope: (subGetCode, callback) => this.scope(
                code => subGetCode(getCode(code)),
                callback
            )
        })
    }

    defineVar(title, moduleCode: string, varCode: string) {
        const varName = `Var${++counter}`;
        const fileName = this.expectToBeValid(title, `${moduleCode};
        export const ${varName} = ${varCode};`);
        const moduleName = basename(fileName).replace(/\.tsx?$/, '');
        return `import {${varName}} from "./${moduleName}"; ${varName}`;
    }


}


class TypeScriptSubTester {
    constructor(public tester: TypeScriptTester,
                public getCode: (code: string) => string) {
    }

    expectToBeValid(code) {
        this.tester.expectToBeValid(this.getCode(code))
    }

    expectToBeInvalid(code) {
        this.tester.expectToBeInvalid(this.getCode(code))
    }

    sub(getCode: (code: string) => string, callback?: (tester: TypeScriptSubTester) => void): TypeScriptSubTester {
        const tester = new TypeScriptSubTester(this.tester,
            code => this.getCode(getCode(code)));
        callback?.(tester);
        return tester
    }
}
