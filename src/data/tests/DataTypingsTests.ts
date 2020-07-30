import {IsNever} from "../../common/typings";
import {DataExp} from "../../json-exp/DataExp";
import {AEntity, BEntity} from "../../typeorm/relations/tests/Entities";
import {DataSelection} from "../DataSelection";
import {DataSelectionRow} from "../DataSelectionRow";
import {DataUnion} from "../DataUnion";
import {DataUnionRow} from "../DataUnionRow";
import {DebugType, MetaType} from "../MetaType";
import {DBase, DChild1, DUnion, EUnion} from "./BaseEntities";



pass(() => {
    // DataSelection of AEntity
    {

        // @ts-expect-error
        testSelection(AEntity, {relations: {x: true}});

        testSelection(AEntity, {relations: {oneAToOneB: true}}, row => {
            assertType<BEntity>(row.oneAToOneB);

            // @ts-expect-error
            assertType<BEntity>(row.oneAToOneBOwner);

            assertType<BEntity>(row.oneAToOneBOwner!);
        });

        testSelection(AEntity, {relations: {oneAToManyB: true}});

        testSelection(AEntity, {relations: {oneAToOneB: {relations: {oneBToManyA: true}}}});

        // @ts-expect-error
        testSelection(AEntity, {relations: {oneAToOneB: {relations: {x: true}}}});


        // @ts-expect-error
        testSelection(AEntity, {unions: {x: {}}})

    }

    // DataSelection of DUnion
    {
        // @ts-expect-error
        testSelection(DUnion, {unions: {x: {}}});

        testSelection(DUnion, {unions: {dChild1: {}}});

    }

    // DataSelection of DUnion at *To*E as eChild1
    {
        // @ts-expect-error
        testSelection(DUnion, {relations: {oneDToOneE: {unions: {x: {}}}}});

        testSelection(DUnion, {relations: {oneDToOneE: {unions: {eChild1: {}}}}});

        // @ts-expect-error
        testSelection(DUnion, {relations: {oneDToManyE: {unions: {x: {}}}}});

        testSelection(DUnion, {relations: {oneDToManyE: {unions: {eChild1: {}}}}});
    }
    // DataSelection of DUnion as dChild1 at  *To*E as eChild1
    {

        // @ts-expect-error
        testSelection(DUnion, {unions: {dChild1: {relations: {oneDToOneE: {unions: {x: {}}}}}}});

        testSelection(DUnion, {unions: {dChild1: {relations: {oneDToOneE: {unions: {eChild1: {}}}}}}});
    }

    // DataSelectionRow
    {


        test(DUnion, {}, d => {

            // @ts-expect-error
            assertKey(d, "x");

            assertType<string>(d.dText!);

        });

        test(DUnion, {
            relations: {
                oneDToOneE: {
                    fields: {eField: 1}
                }
            }
        }, d => {

            // @ts-expect-error
            assertKey(d, "x");

            assertType<string>(d.dText!);

        });

        function test<T, S extends DataSelection<T>>(
            type: new(...args: any[]) => T,
            selection: S,
            callback?: (row: DataSelectionRow<T, S>) => void) {

        }
    }

    // IsNever
    {

        assertType<IsNever<never>>(true);

        // @ts-expect-error
        assertType<IsNever<any>>(true);

        // @ts-expect-error
        assertType<IsNever<never>>(false);
    }

    // DataUnion
    {
        // no children
        {

            class DUnion extends DataUnion(DBase, {}) {

            }
        }

        testMetaType<DUnion>(mt => {
            testMetaType<typeof mt.unionChildren.dChild1>(mt => {

                // @ts-expect-error
                void (mt.unionRelations.x);

                assertType<EUnion>(mt.unionRelations.oneDToOneE);

                assertType<EUnion>(mt.unionRelations.manyDChild1ToOneE);
            });

            testMetaType<typeof mt.unionChildren.dChild2>(mt => {

                // @ts-expect-error
                void (mt.unionRelations.x);

                assertType<EUnion>(mt.unionRelations.oneDToOneE);

            });
        });
    }

    // DataUnionRow
    {

        testType<MetaType.Of<DUnion>>(d => {

            assertType<EUnion>(d.unionRelations.oneDToOneE!);

            // @ts-expect-error
            assertType(d.unionChildren.x);

            assertType<string>(d.unionChildren.dChild1.dChild1Text!);

            // @ts-expect-error
            assertType(d.unionChildren.dChild1.x);
        });

        testType<DataUnionRow.Of<DUnion>>(d => {
            void (d.dId);
            void (d.dText);

            void (d.oneDToOneE);
            void (d.oneDToOneE?.eType);


            // @ts-expect-error
            void (d.x);

            // @ts-expect-error
            void (d.eType === "x")

            // @ts-expect-error
            void (d.dChild1Text);

            // @ts-expect-error
            void (d.manyDChild1ToOneE);

            // @ts-expect-error
            void (d.oneDToOneE?.eType === "x");

            void (d.oneDToOneE?.eType === "eChild1")

            if (d.dType === "dChild1") {
                void (d.dId);
                void (d.dText);
                void (d.dChild1Text);

                testDebugType(d, d => {

                    testMetaType<typeof d.Relations.oneDToOneE>(mt => {
                        void (mt.unionChildren.eChild1);
                        void (mt.unionChildren.eChild2);
                        void (mt.unionChildren.eChild1Child1);

                        // @ts-expect-error
                        void (mt.unionChildren.x);
                    });

                    testMetaType<typeof d.ChildRelations.manyDChild1ToManyE>(mt => {
                        void (mt.unionChildren.eChild1);
                        void (mt.unionChildren.eChild2);
                        void (mt.unionChildren.eChild1Child1);

                        // @ts-expect-error
                        void (mt.unionChildren.x);
                    });
                })


                void (d.oneDToOneE);
                void (d.manyDChild1ToOneE);

                void (d.oneDToOneE?.eType);
                void (d.manyDChild1ToOneE?.eType);

                // @ts-expect-error
                void (d.oneDToOneE?.eType === "x")


                if (d.oneDToOneE?.eType === "eChild1") {
                    void (d.oneDToOneE?.eText);
                    void (d.oneDToOneE?.eChild1Text);
                    testDebugType(d.oneDToOneE!, d => {

                    })


                    // @ts-expect-error
                    void (d.oneDToOneE?.x);


                }

                // @ts-expect-error
                void (d.manyDChild1ToOneE?.eType === "x");

                if (d.manyDChild1ToOneE?.eType === "eChild1") {

                }
            }


        });
    }

    // AsExp
    {
        // $as dChild1
        {
            test({$as: {dChild1: true}});
            test({$as: {dChild1: {dText: ""}}});
            test({$as: {dChild1: {dChild1Text: ""}}});
            test({dText: ""});

            // @ts-expect-error
            testSelection({x: ""});

            // @ts-expect-error
            test({$as: {x: true}});

            // @ts-expect-error
            test({$as: {dChild1: {x: ""}}});


            // @ts-expect-error
            testTypeExp(DataUnion(DBase, {}), {$as: {dChild1: true}});


            {
                // $as dChild1
                testTypeExp(DataUnion(DBase, "dType", {
                    dChild1: DChild1
                }), {
                    $as: {dChild1: true}
                });

                // $as dChild1 at oneDToOneE
                testTypeExp(DataUnion(DBase, "dType", {
                    dChild1: DChild1
                }), {
                    $as: {
                        dChild1: {
                            $at: {oneDToOneE: true}
                        }
                    }
                });

                // $as dChild1 at oneDToOneE with relation
                testTypeExp(DataUnion(DBase, "dType", {
                    dChild1: DChild1
                }, {
                    oneDToOneE: EUnion
                }), {
                    $as: {
                        dChild1: {
                            $at: {oneDToOneE: true}
                        }
                    }
                });


                // $as dChild1 at oneDToOneE with child-relation
                testTypeExp(DataUnion(DBase, "dType", {
                    dChild1: DataUnion(DChild1, {
                        oneDToOneE: EUnion
                    })
                }, {
                    oneDToOneE: EUnion
                }), {
                    $as: {
                        dChild1: {
                            $at: {oneDToOneE: true}
                        }
                    }
                });
            }


        }

        {

            // @ts-expect-error
            testTypeExp(AEntity, {$as: {x: true}});
        }


        testType<DataUnionRow.ChildrenOf<AEntity>>(children => {

            // @ts-expect-error
            void (children.eChild1Child1);

            // @ts-expect-error
            void (children.x);
        })


        // @ts-expect-error
        test({$as: {dChild1: {$at: {x: true}}}});


        // $as dChild1 $at manyDChild1ToOneE ...
        {
            test({$as: {dChild1: {$at: {manyDChild1ToOneE: true}}}});

            test({$as: {dChild1: {$at: {manyDChild1ToOneE: {eText: ""}}}}});

            // @ts-expect-error
            test({$as: {dChild1: {$at: {manyDChild1ToOneE: {x: ""}}}}});

            // @ts-expect-error
            test({$as: {dChild1: {$at: {manyDChild1ToOneE: {$as: {x: true}}}}}});
        }
        // $as dChild1 $at manyDChild1ToOneE $as eChild1
        {
            test({$as: {dChild1: {$at: {manyDChild1ToOneE: {$as: {eChild1: true}}}}}});

            test({$as: {dChild1: {$at: {manyDChild1ToOneE: {$as: {eChild1: {eText: ""}}}}}}});

            test({$as: {dChild1: {$at: {manyDChild1ToOneE: {$as: {eChild1: {eChild1Text: ""}}}}}}});
        }
        // $as dChild1 $at manyDChild1ToOneE $at oneDToOneE
        {

            test({$as: {dChild1: {$at: {oneDToOneE: true}}}});

            test({$as: {dChild1: {$at: {oneDToOneE: {eText: ""}}}}});

            // @ts-expect-error
            test({$as: {dChild1: {$at: {oneDToOneE: {x: ""}}}}});

            // @ts-expect-error
            test({$as: {dChild1: {$at: {oneDToOneE: {eChild1Text: ""}}}}});

        }
        // $as dChild1 $at manyDChild1ToOneE $at oneDToOneE $as eChild1
        {

            // @ts-expect-error
            test({$as: {dChild1: {$at: {oneDToOneE: {$as: {x: true}}}}}});

            test({$as: {dChild1: {$at: {oneDToOneE: {$as: {eChild1: true}}}}}});

            // @ts-expect-error
            test({$as: {dChild1: {$at: {oneDToOneE: {$as: {eChild1: {x: ""}}}}}}});

            test({$as: {dChild1: {$at: {oneDToOneE: {eText: ""}}}}});

            test({$as: {dChild1: {$at: {oneDToOneE: {$as: {eChild1: {eText: ""}}}}}}});

            test({$as: {dChild1: {$at: {oneDToOneE: {$as: {eChild1: {eChild1Text: ""}}}}}}});

        }

        // $at oneDToOneE $as eChild1
        {
            test({$at: {oneDToOneE: true}});

            // @ts-expect-error
            test({$at: {oneDToOneE: {$as: {x: true}}}});

            test({$at: {oneDToOneE: {$as: {eChild1: true}}}});

            test({$at: {oneDToOneE: {$as: {eChild1: {eText: ""}}}}});

            test({$at: {oneDToOneE: {$as: {eChild1: {eChild1Text: ""}}}}});

            // @ts-expect-error
            testSelection({$at: {oneDToOneE: {$as: {eChild1: {x: ""}}}}});

        }


        function test(exp: DataExp<DUnion>) {

        }

    }


});


function pass(...args) {

}


function testMetaType<T>(
    callback: (mt: MetaType.Of<T>) => void
) {

}

function testDebugType<T extends Record<typeof DebugType, any>>(value: T,
                                                                callback: (debug: T[typeof DebugType]) => void) {

}

function testTypeExp<T>(cls: new() => T,
                        exp: DataExp<T>) {

}

function assertType<T>(value: T) {

}

function testType<T>(callback: (value: T) => void) {

}

function assertKey<T>(value: T, key: keyof Required<T>)
function assertKey<T>(key: keyof Required<T>)
function assertKey(...args) {

}

function testSelection<T, S extends DataSelection<T>>(
    type: new(...args: any[]) => T,
    selection: S,
    callback?: (row: DataSelectionRow<T, S>) => void) {


}
