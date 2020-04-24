import {CommandOptions} from "typeorm";
import {
    CompilerOptions,
    createCompilerHost,
    createProgram,
    DiagnosticMessageChain,
    getPreEmitDiagnostics
} from "typescript";
import {hook} from "../../common/object/hook";
import {dirname, join, basename} from "path";

let counter = 0;

export class TypingsTester {

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


    expectToError(code: string) {
        const fileName = this.createVirtualFile(code);
        it('', () => {
            if (!this.fileNameToMessageText[fileName]) {
                fail(`expected to error:\n\t${code.replace(/\n/g, "\n\t").trim()}`)
            }
        })
    }

    expectToPass(code: string) {
        const fileName = this.createVirtualFile(code);
        it('', () => {
            if (this.fileNameToMessageText[fileName]) {
                fail(`expected to pass ${this.fileNameToMessageText[fileName]}:\n\t${code.replace(/\n/g, "\n\t").trim()}`)
            }
        });
        return fileName;
    }


    defineVar(moduleCode: string, varCode: string) {
        const varName = `Var${++counter}`;
        const fileName = this.expectToPass(`${moduleCode};
        export const ${varName} = ${varCode};`);
        const moduleName = basename(fileName).replace(/\.tsx?$/, '');
        return `import {${varName}} from "./${moduleName}"; ${varName}`;
    }

}

const tester = new TypingsTester(__dirname);


const routerVar = tester.defineVar(`import {Router} from ".."`, `
    Router
        .route("child", Router.route("sub-child"))
`);


describe('', () => {

    tester.expectToPass(`${routerVar}.at("child");`);

    tester.expectToPass(`${routerVar}.at("child").at("sub-child");`);

    tester.expectToError(`${routerVar}.at("invalid-child")`);

    tester.expectToError(`${routerVar}.at("child").at("invalid-child")`);


})
