import {TypeScriptTester} from "./TypeScriptTester";



testm(__filename, () => {
    const tester = new TypeScriptTester(__dirname);


    const routerVar = tester.defineVar('BaseRouter',`import {Router} from ".."`,
        `Router.route("child", Router.route("sub-child"))`);

    tester.expectToBeValid(`${routerVar}.at("child");`);

    tester.expectToBeValid(`${routerVar}.at("child").at("sub-child");`);

    tester.expectToBeInvalid(`${routerVar}.at("invalid-child")`);

    tester.expectToBeInvalid(`${routerVar}.at("child").at("invalid-child")`);


})
