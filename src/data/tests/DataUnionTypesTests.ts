import {DataExp} from "../../json-exp/DataExp";
import {TypeScriptTester} from "../../router/tests/TypeScriptTester";
import {DataSelection} from "../DataSelection";
import {DataUnion, DataUnionMetaType} from "../DataUnion";
import {ABase, AUnion} from "./BaseEntities";
import MetaTypeOf = DataUnion.MetaTypeOf;


testm(__filename, () => {
    const tester = new TypeScriptTester(__dirname)

    tester.sub(code => `
import {AUnion} from "./BaseEntities";
import {DataExp} from "../../json-exp/DataExp";
import {DataUnion} from "../DataUnion";
${code}\n`, tester => {

        tester.sub(code => `declare function testExp(type:DataExp<AUnion>);
            testExp(${code});`, tester => {
            describe('exp', () => {
                tester.expectToBeInvalid(`{$as:{aChild1X: true}}`);
                tester.sub(code => `{$as:{aChild1: ${code}}}`, tester => {

                    tester.expectToBeValid('true');
                    tester.expectToBeValid('{aChild1Text:"hello"}');
                    tester.expectToBeInvalid('{xxx:true}');
                    tester.expectToBeInvalid('{$at:{xxx:true}}');

                    describe('to-one B', () => {
                        tester.sub(code => `{$at:{manyAChild1ToOneB: ${code}}}`,
                            tester => {
                                tester.expectToBeValid('true');
                                tester.expectToBeValid('{bText:"hello"}');
                                tester.expectToBeInvalid('{bTextX:"hello"}');
                            });
                    })
                });

            })

        });


        debugType<DataUnion.RowOf<DataUnion.MetaTypeOf<AUnion>>>(row => {

            if (row.aType === "aChild1") {
                if (row.manyAToOneB?.bType === "bChild1") {
                    row.manyAToOneB.bChild1Text
                }
            }

        })

        tester.sub(code => `declare let row: DataUnion.RowOf<DataUnion.MetaTypeOf<AUnion>>;
            ${code};\n`, tester => {


            describe('AUnion', () => {
                describe('as aChild1', () => {
                    tester.expectToBeValid(
                        '(row.aType==="aChild1") ' +
                        '&& (row.manyAToOneB?.bType==="bChild1")' +
                        '&& (row.manyAToOneB.bChild1Text === "hello")')

                    tester.expectToBeInvalid(
                        '(row.aType==="aChild1") ' +
                        '&& (row.manyAToOneB.bChild1Text === "hello")')
                })

                describe('to one b', () => {
                    tester.expectToBeValid(`row.manyAToOneB?.bType === "bChild1"`);
                    tester.expectToBeValid(
                        `(row.manyAToOneB?.bType === "bChild1") 
            && (row.manyAToOneB.bChild1Text === "hello")`
                    );
                    tester.expectToBeInvalid(`row.manyAToOneB.bChild1Text === "hello"`);
                    tester.expectToBeInvalid(`row.manyAToOneB?.bType === "xxx"`);

                })
                describe('to many b', () => {
                    tester.expectToBeValid(`row.manyAToManyBOwner?.[0].bType === "bChild1"`);
                    tester.expectToBeInvalid(`row.manyAToManyBOwner?.[0].bType === "xxxx"`);
                })

            });

        });


    });

    tester.sub((code) => `import {AUnion} from "./BaseEntities";
import {DataSelection} from "../DataSelection";
import {DataUnion} from "../DataUnion";
${code}`, tester => {

        tester.sub(code => `
declare function testSelection(s:DataSelection< AUnion>);
testSelection(${code});
`, tester => {


            tester.expectToBeInvalid(`{unions:{aChildX:{}}}`);
            tester.expectToBeValid(`{unions:{aChild1:{}}}`);

            tester.expectToBeInvalid(`{relations:{manyAToOneB:{xxx:{}}}}`);

        });


        tester.sub(code => `
       let sel: DataSelection<AUnion>;
       declare function asObject(value):T;
        void(${code})`, tester => {

            tester.expectToBeValid(`sel!.unions!.aChild1`);
            tester.expectToBeInvalid(`sel!.unions!.aChildX`);

            // tester.expectToBeValid(`sel!.relations!.manyAToOneB!.unions!.bChild1`);
            // tester.expectToBeInvalid(`sel!.relations!.manyAToOneB!.unions!.bChildX`);


        })

    })


    debugType<DataSelection<AUnion>>(s => {


        s.$debugType?.manyAToOneB!.bType;

        if (typeof s.relations!.manyAToOneB === "object") {


            debugTypeInto(s.relations!.manyAToOneB!, t => {

                debugTypeInto(t.$debugBase!.T!
                    [DataUnionMetaType]!.unionChildren, t => {

                    void (t.bChild1);
                    void (t.bChildX);


                })

            })
            // s.relations?
            // s.relations!.manyAToOneB.$debugMetaType

            s.relations!.manyAToOneB.unions!.bChildX;
            s.relations!.manyAToOneB.unions!.bChildX;
            s.relations!.manyAToOneB.unions!.bChild1;

        }
    })

    testSelection({
        unions: {
            aChild1: {}
        },
        relations: {
            manyAToOneB: {
                unions: {
                    bChild1x: {}
                }
            }
        }
    });

    testSelection({
        unions: {
            aChild1: {
                relations: {
                    manyAChild1ToOneB: {
                        unions: {
                            bChild1: {
                                pick:["bText"]
                            }
                        }
                    }
                }
            }
        },
        relations: {
            manyAToOneB: {
                unions: {
                    bChild1: {}
                }
            }
        }
    });


    function testSelection<T = AUnion>(selection: DataSelection<T>) {

    }

    function testExp(exp: DataExp<AUnion>) {

    }

    function debugTypeInto<T>(
        value: T,
        callback: (value: T) => void) {

    }

    function debugType<T>(
        callback: (value: T) => void) {

    }
})

