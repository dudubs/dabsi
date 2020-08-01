import {IsNever, Pluck} from "../../common/typings";
import {DataExp} from "../../json-exp/DataExp";
import {AEntity} from "../../typeorm/relations/tests/Entities";
import {DataRow} from "../DataRow";
import {DataSelection} from "../DataSelection";
import {DataSelectionRow} from "../DataSelectionRow";
import {DataUnion} from "../DataUnion";
import {DataUnionRow} from "../DataUnionRow";
import {DebugType, MetaType} from "../MetaType";
import {DBase, DChild1, DUnion, EUnion} from "./BaseEntities";


pass(() => {
    // DataSelection
    {
        // MergePicks
        {
            testType<DataSelection.MergePicks<undefined, undefined>>(d => {
                assertType<undefined>(d);
            });

            testType<DataSelection.MergePicks<(keyof { a, b })[], undefined>>(d => {
                assertType<Pluck<typeof d, number>>("a");

                assertType<Pluck<typeof d, number>>("b");

                // @ts-expect-error
                assertType<Pluck<typeof d, number>>("x");

            });

            testType<DataSelection.MergePicks<undefined, (keyof { a, b })[]>>(d => {
                assertType<Pluck<typeof d, number>>("a");

                assertType<Pluck<typeof d, number>>("b");

                // @ts-expect-error
                assertType<Pluck<typeof d, number>>("x");

            });


            testType<DataSelection.MergePicks<(keyof { a, b })[], (keyof { b, c })[]>>(d => {
                assertType<Pluck<typeof d, number>>("a");

                assertType<Pluck<typeof d, number>>("b");

                assertType<Pluck<typeof d, number>>("c");

                // @ts-expect-error
                assertType<Pluck<typeof d, number>>("x");

            });
        }
    }

    // DataSelection of AEntity
    {

        // @ts-expect-error
        testSelection(AEntity, {relations: {x: true}});

        testSelection(AEntity, {relations: {oneAToOneB: true}});

        testSelection(AEntity, {relations: {oneAToManyB: true}});

        testSelection(AEntity, {relations: {oneAToOneB: {relations: {oneBToManyA: true}}}});

        // @ts-expect-error
        testSelection(AEntity, {relations: {oneAToOneB: {relations: {x: true}}}});

        // @ts-expect-error
        testSelection(AEntity, {children: {x: {}}})

        testSelection(AEntity, {}, row => {
            void (row.aText);

            void (row.aId);
        });

        testSelection(AEntity, {pick: ["aText"]}, row => {
            void (row.aText);

            // @ts-expect-error
            void (row.aId);
        });

        testSelection(AEntity, {pick: []}, row => {
            // @ts-expect-error
            void (row.aText);

            // @ts-expect-error
            void (row.aId);
        });

        testSelection(AEntity, {
            fields: {
                ax: 1
            },
            relations: {
                oneAToOneB: {
                    pick: ["bId"],
                    fields: {
                        bx: 1
                    }
                },
                manyAToManyA: {
                    fields: {
                        bx: 1
                    }
                }
            }
        }, row => {

            // @ts-expect-error
            void (row.x);

            void (row.ax);

            // @ts-expect-error
            void (row.oneAToOneB?.x);

            void (row.oneAToOneB?.bx);

            void (row.oneAToOneB?.bId);

            // @ts-expect-error
            void (row.oneAToOneB?.bText);

            void (row.oneAToOneBOwner?.bText);

            // @ts-expect-error
            void (row.oneAToOneBOwner?.bx);

            // @ts-expect-error
            void (row.oneAToManyB?.[0].x);

            void (row.manyAToManyA?.[0].bx);

            // @ts-expect-error
            void (row.manyAToManyAOwner?.[0].bx);
        });

    }

    // DataSelection of DUnion
    {
        // @ts-expect-error
        testSelection(DUnion, {children: {x: {}}});

        testSelection(DUnion, {children: {dChild1: {}}});

        testSelection(DataUnion(DBase, {
            relations: {
                oneDToOneE: EUnion
            }
        }), {

            fields: {
                x_d: 1
            },

            relations: {

                oneDToOneE: {
                    pick: ['eId'],
                    fields: {
                        x_d_e: 1
                    },
                    children: {
                        eChild1: {
                            pick: ['eText', 'eChild1Text'],
                            fields: {
                                x_d_eChild1: 1
                            }
                        }
                    }
                }
            }
        }, (dRow, dSelRow, dt, s) => {

            testMetaType<DUnion>(mt => {

                void (mt.unionType?.dText);

                // @ts-expect-error
                void (mt.unionType?.x);
            });

            testMetaType<typeof dSelRow>(mt => {


                // @ts-expect-error
                void (mt.unionRelations.oneDToOneE.x);

                void (mt.unionRelations.oneDToOneE.x_d_e);

                testMetaType<typeof mt.unionRelations.oneDToOneE>(mt => {

                    // @ts-expect-error
                    void (mt.unionChildren.x);

                    void (mt.unionChildren.eChild1);

                    // @ts-expect-error
                    void (mt.unionChildren.eChild1.x);

                    void (mt.unionChildren.eChild1.x_d_eChild1);

                    void (mt.unionChildren.eChild1.eId);

                    void (mt.unionChildren.eChild1.eText);

                    // @ts-expect-error
                    void (mt.unionChildren.eChild2.eText);

                    testType<typeof mt.unionType>(e => {


                    })
                });

            });

            // @ts-expect-error
            void (dRow.x);

            void (dRow.x_d);

            // @ts-expect-error
            void (dRow.oneDToOneE?.$type === "x");

            // @ts-expect-error
            void (dRow.oneDToOneE?.x);

            void (dRow.oneDToOneE?.x_d_e);


            /*

            Relation<Base<Relation<EBase>, {
             pick: "eId"[];

             fields: { x_d_e: number; };

             children: {
                eChild1: {
                    pick: ("eText" | "eChild1Text")[];

            fields: {

                x_d_eChild1: number;
                };
                 }; }; }>>

             */
            if (dRow.oneDToOneE?.$type === "eChild1") {

            }
        })


        testType<DataSelection.Merge<{
            pick: ["dId"],
            fields: {
                dX: 1,
            },
            relations: {
                oneDToOneE: {
                    // names:
                    // fields
                    pick: ["eId"],
                    fields: {
                        eXByD: 1
                    },
                    children: {
                        eChild1: {
                            fields: {
                                eXByDByEChild1: 1
                            }
                        }
                    }
                }
            }
        }, {
            pick: ["dText", "dChild1Text"],
            fields: {
                dChild1X: 1
            },
            relations: {
                oneDToOneE: {
                    pick: ["eText"],
                    fields: {
                        eXByDChild1: 1
                    },
                    children: {
                        eChild1: {
                            pick: ["eChild1Text"],
                            fields: {
                                eXByDChild1ByEChild1: 1
                            }
                        }
                    }
                }
            }
        }>>(s => {

            // @ts-expect-error
            assertType<Pluck<typeof s.relations.oneDToOneE.pick, number>>("x");


            assertType<Pluck<typeof s.relations.oneDToOneE.pick, number>>("eId");

            assertType<Pluck<typeof s.relations.oneDToOneE.pick, number>>("eText");

            assertType<Pluck<typeof s.relations.oneDToOneE.children.eChild1.pick,
                // @ts-expect-error
                number>>("x");

            assertType<Pluck<typeof s.relations.oneDToOneE.children.eChild1.pick,
                number>>("eChild1Text");

            // @ts-expect-error
            void(s.relations.oneDToOneE.fields.x);

            void(s.relations.oneDToOneE.fields.eXByD);

            void(s.relations.oneDToOneE.fields.eXByDChild1);

        });

        testSelection(DUnion, {
            pick: ["dId"],
            fields: {
                dX: 1,
            },
            relations: {
                oneDToOneE: {
                    // names:
                    // fields
                    pick: ["eId"],
                    fields: {
                        eXByD: 1
                    },
                    children: {
                        eChild1: {
                            fields: {
                                eXByDByEChild1: 1
                            }
                        }
                    }
                }
            },
            children: {
                dChild1: {
                    pick: ["dText", "dChild1Text"],
                    fields: {
                        dChild1X: 1
                    },
                    relations: {
                        oneDToOneE: {
                            pick: ["eText"],
                            fields: {
                                eXByDChild1: 1
                            },
                            children: {
                                eChild1: {
                                    pick: ["eChild1Text"],
                                    fields: {
                                        eXByDChild1ByEChild1: 1
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }, (d, ds) => {

            // @ts-expect-error
            void (d.$type === "x");

            void (d.dId);

            // @ts-expect-error
            void (d.dText);

            // @ts-expect-error
            void (d.dChild1Text)

            void (d.dX);

            // @ts-expect-error
            void (d.dChild1X);

            if(d.$type==="dChild1") {
                const dChild1E = d.oneDToOneE;
                if (dChild1E) {

                    void (dChild1E.eId);

                    void (dChild1E.eText);

                    // @ts-expect-error
                    void (dChild1E.eText2);

                    // @ts-expect-error
                    void (dChild1E.eChild1Text);

                    // @ts-expect-error
                    void (dChild1E.$type === "x");

                    if (dChild1E.$type === "eChild1") {

                        void (dChild1E.eText);

                        void (dChild1E.eChild1Text);

                    }
                }
            }



            testMetaType<typeof ds>(mt => {

                const dChild1E = mt.unionChildren.dChild1.oneDToOneE!;

                void(dChild1E.eText);

                // @ts-expect-error
                void(dChild1E.eText2);

                // @ts-expect-error
                void (mt.unionChildren.x);
            });


            if (d.$type === "dChild1") {

                void (d.dId);

                void (d.dText);

                void (d.dChild1Text);

                void (d.dX);

                void (d.dChild1X);

            } else if (d.$type === "dChild2") {

                void (d.dId);

                // @ts-expect-error
                void (d.dText);

                // @ts-expect-error
                void (d.dChild1Text);

                void (d.dX);

                // @ts-expect-error
                void (d.dChild1X);
            }


        })

    }

    // DataSelection of DUnion at *To*E as eChild1
    {
        // @ts-expect-error
        testSelection(DUnion, {relations: {oneDToOneE: {children: {x: {}}}}});

        testSelection(DUnion, {relations: {oneDToOneE: {children: {eChild1: {}}}}});

        // @ts-expect-error
        testSelection(DUnion, {relations: {oneDToManyE: {children: {x: {}}}}});

        testSelection(DUnion, {relations: {oneDToManyE: {children: {eChild1: {}}}}});
    }
    // DataSelection of DUnion as dChild1 at  *To*E as eChild1
    {

        // @ts-expect-error
        testSelection(DUnion, {children: {dChild1: {relations: {oneDToOneE: {children: {x: {}}}}}}});

        testSelection(DUnion, {children: {dChild1: {relations: {oneDToOneE: {children: {eChild1: {}}}}}}});
    }

    // DataSelectionRow of Union
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

            class _DUnion extends DataUnion(DBase, {
                relations: {oneDToManyE: EUnion}
            }) {

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
            void (d.oneDToOneE?.$type);


            // @ts-expect-error
            void (d.x);

            // @ts-expect-error
            void (d.$type === "x")

            // @ts-expect-error
            void (d.dChild1Text);

            // @ts-expect-error
            void (d.manyDChild1ToOneE);

            // @ts-expect-error
            void (d.oneDToOneE?.$type === "x");

            void (d.oneDToOneE?.$type === "eChild1")

            if (d.$type === "dChild1") {
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

                void (d.oneDToOneE?.$type);
                void (d.manyDChild1ToOneE?.$type);

                // @ts-expect-error
                void (d.oneDToOneE?.$type === "x")


                if (d.oneDToOneE?.$type === "eChild1") {
                    void (d.oneDToOneE?.eText);
                    void (d.oneDToOneE?.eChild1Text);
                    testDebugType(d.oneDToOneE!, d => {

                    })


                    // @ts-expect-error
                    void (d.oneDToOneE?.x);


                }

                // @ts-expect-error
                void (d.manyDChild1ToOneE?.$type === "x");

                if (d.manyDChild1ToOneE?.$type === "eChild1") {

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
                testTypeExp(DataUnion(DBase, {
                    children: {
                        dChild1: DChild1
                    }
                }), {
                    $as: {dChild1: true}
                });

                // $as dChild1 at oneDToOneE
                testTypeExp(DataUnion(DBase, {
                    children: {
                        dChild1: DChild1
                    }
                }), {
                    $as: {
                        dChild1: {
                            $at: {oneDToOneE: true}
                        }
                    }
                });

                // $as dChild1 at oneDToOneE with relation
                testTypeExp(DataUnion(DBase, {
                    relations: {oneDToOneE: EUnion}, children: {dChild1: DChild1}
                }), {
                    $as: {
                        dChild1: {
                            $at: {oneDToOneE: true}
                        }
                    }
                });


                // $as dChild1 at oneDToOneE with child-relation
                testTypeExp(DataUnion(DBase, {
                    relations: {oneDToOneE: EUnion},
                    children: {
                        dChild1: DataUnion(DChild1, {
                            relations: {oneDToOneE: EUnion}
                        })
                    },
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
    callback?: (row: DataRow<DataSelectionRow<T, S>>,
                selRow: DataSelectionRow<T, S>,
                t: T,
                s: S) => void) {


}
