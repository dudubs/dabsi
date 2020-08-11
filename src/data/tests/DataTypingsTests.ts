import {Constructor, HasKeys, IsNever, Pluck} from "../../common/typings";
import {DataExp} from "../../json-exp/DataExp";
import {AEntity} from "../../typeorm/relations/tests/Entities";
import {DataRow, DataUnionRow} from "../DataRow";
import {DataSelection, FlatDataSelection} from "../DataSelection";
import {DataSelectionRow} from "../DataSelectionRow";
import {DataSelectionRow2} from "../DataSelectionRow2";
import {DataSource} from "../DataSource";
import {DataUnion, DataUnionChildren, DataUnionChildrenKey} from "../DataUnion";
import {_MergePicks, MergeDataSelection} from "../MergeDataSelection";
import {MapRelation, RelationKeys, RelationTypeAt} from "../Relation";
import {DBase, DChild1, DUnion, EUnion} from "./BaseEntities";


pass(() => {


    // DataUnion
    {
        // no children
        {

            class _DUnion extends DataUnion(DBase, {
                relations: {oneDToManyE: EUnion}
            }) {

            }
        }

        testType<DUnion[DataUnionChildrenKey]>(d => {
            void (d.dChild1.dChild1Text);

            // @ts-expect-error
            void (d.dChild1.x);
        })

    }

    // DataUnionRow
    {
        testType<DataUnionRow<DUnion>>(d => {

            // @ts-expect-error
            assertType<DataUnionChildren<any>>(d);

            // @ts-expect-error
            void (d.$type === "x");

            if (d.$type === "dChild1") {


            }
        });
    }

    // DataSelection
    {
        // MergePicks
        {
            testType<_MergePicks<undefined, undefined>>(d => {
                assertType<undefined>(d);
            });

            testType<_MergePicks<(keyof { a, b })[], undefined>>(d => {
                assertType<Pluck<typeof d, number>>("a");

                assertType<Pluck<typeof d, number>>("b");

                // @ts-expect-error
                assertType<Pluck<typeof d, number>>("x");

            });

            testType<_MergePicks<undefined, (keyof { a, b })[]>>(d => {
                assertType<Pluck<typeof d, number>>("a");

                assertType<Pluck<typeof d, number>>("b");

                // @ts-expect-error
                assertType<Pluck<typeof d, number>>("x");

            });


            testType<_MergePicks<(keyof { a, b })[], (keyof { b, c })[]>>(d => {
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
        testSelection(AEntity, {relations: {x: true}} as const);

        testSelection(AEntity, {relations: {oneAToOneB: true}});

        testSelection(AEntity, {relations: {oneAToManyB: true}});

        testSelection(AEntity, {relations: {oneAToOneB: {relations: {oneBToManyA: true}}}});

        // @ts-expect-error
        testSelection(AEntity, {relations: {oneAToOneB: {relations: {x: true}}}});

        // @ts-expect-error
        testSelection(AEntity, {children: {x: {}}} as const);


        testSelection(AEntity, {} as const, row => {
            void (row.aText);

            void (row.aId);
        });

        testType<FlatDataSelection<{ pick: ['aText'] }>>(t => {

            // @ts-expect-error
            t.pick[0] === "x";

            // @ts-expect-error
            t.relations;


        });

        type XF<S> = IsNever<S> extends true ? {} : S;
        type X<T, S> =
            IsNever<S> extends true ? T :
                HasKeys<S> extends false ? T :
                    & Omit<T, DataUnionChildrenKey | RelationKeys<T>>
                    & { x: Pluck<S, 'x'> }
                    & {
                    [K in RelationKeys<T>]: MapRelation<T[K],
                        X<RelationTypeAt<T, K>,
                            Pluck<Pluck<S, 'relations'>, K>>>
                }
            ;

        testType<X<AEntity, {}>>(d => {

        });

        testType<DataRow<DataSelectionRow2<AEntity, {
            fields: {},
            relations: {}
        }>>>(d => {

        });


        assertType<IsNever<Pluck<never, 'x'>>>(true);


        // @ts-expect-error
        assertType<IsNever<Pluck<never, 'x'>>>(false);


        testSelection(AEntity, {pick: ['aText']} as const, (row, sr, s) => {
            void (row.aText);

            // @ts-expect-error
            s.pick[0] === 'x';

            s.pick[0] === 'aText';

            // @ts-expect-error
            void (row.x);


            // @ts-expect-error
            void (row.aId);
        });


        testSelection(AEntity, {pick: []}, row => {
            // @ts-expect-error
            void (row.aText);

            // @ts-expect-error
            void (row.aId);
        });

        assertType<keyof never>("x");
        testSelection(AEntity, {
            relations: {}
        } as const, (a, as, s) => {

            s
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
                },
            }
        } as const, (a, as) => {

            as.oneAToOneBOwner?.bText;


            // @ts-expect-error
            void (a.x);

            void (a.ax);

            // @ts-expect-error
            void (a.oneAToOneB?.x);

            void (a.oneAToOneB?.bx);

            void (a.oneAToOneB?.bId);

            // @ts-expect-error
            void (a.oneAToOneB?.bText);

            void (a.oneAToOneBOwner?.bText);

            // @ts-expect-error
            void (a.oneAToOneBOwner?.bx);

            // @ts-expect-error
            void (a.oneAToManyB?.[0].x);

            void (a.manyAToManyA?.[0].bx);

            // @ts-expect-error
            void (a.manyAToManyAOwner?.[0].bx);
        });

    }

    // DataSelection of DUnion
    {
        // @ts-expect-error
        testSelection(DUnion, {children: {x: {}}});

        testSelection(DUnion, {children: {dChild1: {}}});

        testSelection(DBase, {
            fields: {
                x_d: 1
            },
            relations: {
                oneDToOneE: {
                    fields: {
                        x_d_e: 1
                    }
                }
            }
        } as const, (d, ds, s) => {


            // @ts-expect-error
            void (ds.x);

            void (ds.x_d);

            // @ts-expect-error
            void (ds.oneDToOneE?.x);

            void (ds.oneDToOneE?.x_d_e);

            // @ts-expect-error
            void (d.x);

            void (d.x_d);

            // @ts-expect-error
            void (d.oneDToOneE?.x);

            void (d.oneDToOneE?.x_d_e);
            ;


        });
        testSelection(
            DataUnion(DBase, {
                relations: {
                    oneDToOneE: EUnion
                },

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
                                pick: ['eChild1Text', 'eId'],
                                fields: {
                                    x_d_eChild1: 1
                                }
                            },
                        }
                    }
                }
            } as const, (d, ds, s) => {

                s.relations.oneDToOneE;


                // @ts-expect-error
                void (ds.x);


                void (ds.x_d);

                // @ts-expect-error
                void (d.x);

                void (d.x_d);

                // @ts-expect-error
                void (d.oneDToOneE?.$type === "x");

                // @ts-expect-error
                void (d.oneDToOneE?.x);

                void (d.oneDToOneE?.x_d_e);


                // @ts-expect-error
                assertType<EUnion>(d.oneDToOneE!);

                void (d.oneDToOneE!.x_d_e);

                // @ts-expect-error
                void (d.oneDToOneE!.x);

                if (d.oneDToOneE?.$type === "eChild1") {

                }
            })


        testType<MergeDataSelection<{
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
            void (s.relations.oneDToOneE.fields.x);

            void (s.relations.oneDToOneE.fields.eXByD);

            void (s.relations.oneDToOneE.fields.eXByDChild1);

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
        } as const, (d, ds) => {

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

            // @ts-expect-error
            ds.$unionChildren.dChild1?.x;

            // @ts-expect-error
            ds.$unionChildren.dChild1?.$unionChildren

            void (ds.$unionChildren.dChild1.dId)

            if (d.$type === "dChild1") {
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

    // DataSelection of DUnion at *To*_E_E as eChild1
    {
        // @ts-expect-error
        testSelection(DUnion, {relations: {oneDToOneE: {children: {x: {}}}}});

        testSelection(DUnion, {relations: {oneDToOneE: {children: {eChild1: {}}}}});

        // @ts-expect-error
        testSelection(DUnion, {relations: {oneDToManyE: {children: {x: {}}}}});

        testSelection(DUnion, {relations: {oneDToManyE: {children: {eChild1: {}}}}});
    }
    // DataSelection of DUnion as dChild1 at  *To*_E_E as eChild1
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


    // DataUnionRow
    {


        testType(DataUnion(DBase, {
            relations: {
                oneDToOneE: EUnion
            },
            children: {
                dChild1: DataUnion(DChild1, {
                    relations: {
                        oneDChild1ToOneE: EUnion
                    }
                })
            }
        }), d => {

        });

        testType<DataUnionRow<DUnion>>(d => {
            void (d.dId);
            void (d.dText);

            // @ts-expect-error
            void (d.x);

            void (d.oneDToOneE);

            void (d.oneDToOneE?.$type);

            if (d.oneDToOneE) {

            }

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


                void (d.oneDToOneE);
                void (d.manyDChild1ToOneE);

                void (d.oneDToOneE?.$type);
                void (d.manyDChild1ToOneE?.$type);

                // @ts-expect-error
                void (d.oneDToOneE?.$type === "x")


                if (d.oneDToOneE?.$type === "eChild1") {
                    void (d.oneDToOneE?.eText);
                    void (d.oneDToOneE?.eChild1Text);


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


    // FlatDataSelection
    {
        testType<FlatDataSelection<{

            children: {
                xChild1: {
                    relations: {
                        xRel: {
                            fields: { xChild1RelField: 1 },
                            children: {
                                xRelChild1: {
                                    fields: { xChild1XRelChild1Field: 1 }
                                }
                            }
                        },
                        xChild1Ref: {},
                        xRel2: {
                            fields: { xChild1Rel2Field: 1 }
                        }
                    }
                }
            },
            relations: {
                xRel: {
                    fields: {
                        xRelField: 1
                    },
                    children: {
                        xRelChild1: {
                            fields: { xRelChild1Field: 1 }
                        }
                    }
                },
                xRel2: true
            }
        }>>(t => {


            // @ts-expect-error
            t.relations.xRel.children.xRelChild1.x;

            // @ts-expect-error
            t.relations.xRel.children.xRelChild1.children.x;

            // @ts-expect-error
            t.relations.xRel.children.xRelChild1.fields.x;

            t.relations.xRel.children.xRelChild1.fields.xRelChild1Field;

            testType<typeof t.children.xChild1.relations.xRel.children.xRelChild1.fields>(f => {
                // @ts-expect-error
                f.x;

                f.xChild1RelField;

                f.xChild1XRelChild1Field;

                f.xRelChild1Field;

                f.xRelField;

            })

            assertType<typeof t.relations.xRel2>(true);

            // @ts-expect-error
            t.children.xChild1.relations.xRel2.fields.x;

            t.children.xChild1.relations.xRel2.fields.xChild1Rel2Field;

            // @ts-expect-error
            t.children.xChild1.relations.x;

            t.children.xChild1.relations.xRel;

            // @ts-expect-error
            t.children.xChild1.relations.xRel.fields.x;

            t.children.xChild1.relations.xRel.fields.xChild1RelField;

            t.children.xChild1.relations.xRel.fields.xRelField;

            t.relations.xRel.fields.xRelField;

            t.children.xChild1.relations.xChild1Ref;

            // @ts-expect-error
            t.relations.x;

            t.relations.xRel;

            // @ts-expect-error
            t.relations.xRel.fields.x;

            t.relations.xRel.fields.xRelField;


        });
    }
    // DataSource.as
    {

        testType<DataSource<DUnion>>(ds => {

            // @ts-expect-error
            ds.insertKey({dChild1Text: ""});

            ds.as("dChild1").insertKey({
                dText: "",
                dChild1Text: "",
                dBoolean: false
            });

            // TODO: test also DataSelection

            testType<DataSelectionRow<DUnion, {
                children: {
                    dChild1: {
                        relations: {}
                    }
                },
                fields: {
                    dX: 1
                },
                relations: {}
            }>>(t => {

                // @ts-expect-error
                t.$unionChildren.x;

                t.$unionChildren.dChild1;

                t.$unionChildren.dChild1.dId;

                t.$unionChildren.dChild2.dId;

                t.dX;

                // @ts-expect-error
                t.$unionChildren.dChild2.x;

                t.$unionChildren.dChild2.dX;

                // @ts-expect-error
                t.$unionChildren.dChild1.x;

                t.$unionChildren.dChild1.dX;
            });

            testType<DataSelectionRow2<DUnion, {
                children: {
                    dChild1: {
                        relations: {}
                    }
                },
                relations: {}
            }>>(t => {

                // @ts-expect-error
                t.$unionChildren.x;

                t.$unionChildren.dChild1;

                t.$unionChildren.dChild1.dId;

                t.$unionChildren.dChild2.dId;

                // @ts-expect-error
                t.$unionChildren.dChild2.x;


                // @ts-expect-error
                t.$unionChildren.dChild1.x;

            });


            ds.select({
                fields: {dX: 1}
            }).getOrFail().then(row => {
                // @ts-expect-error
                void (row.$type === "x");

                void (row.$type === "dChild1");

                void (row.$type === "dChild2");
            });


            ds.getOrFail().then(row => {
                // @ts-expect-error
                void (row.$type === "x");

                void (row.$type === "dChild1");

                void (row.$type === "dChild2");
            });


        })
    }

});


function pass(...args) {

}


function testTypeExp<T>(cls: new() => T,
                        exp: DataExp<T>) {

}

function assertType<T>(value: T) {

}

function testType<T>(callback: (value: T) => void)
function testType<T>(value: T, callback: (value: T) => void)
function testType<T>() {

}

function assertKey<T>(value: T, key: keyof Required<T>)
function assertKey<T>(key: keyof Required<T>)
function assertKey(...args) {

}


testType<new() => DataUnion<DBase, {
    dChild1: DChild1
}, {
    // oneDToOneE:EUnion
}>>(d => {

    /*
    DataSelection<DUnion>()
        .field("", "")
        .as("dChild1", s=> {
            s.pick("")
            s.at("")
        })

     */


    testSelection(d, {} as const, () => {


    }, s => {

    });

    // testSelection(d, {
    //     pick: ['dId'],
    //     relations: {
    //         oneDToOneE: {
    //             pick: ['eId'],
    //             // children: {
    //             //     eChild1: {
    //             //         pick: ['eId']
    //             //     }
    //             // }
    //         }
    //     },
    //     children: {
    //         dChild1: {
    //             pick: ['dId']
    //         }
    //     }
    // } as const, (_, __, s) => {
    //     // @ts-expect-error
    //     s.relations.x;
    //
    //     s.relations.oneDToOneE;
    //
    // });

})

function testSelection<T,
    S extends DataSelection<T>>(
    type: Constructor<T>,
    selection: S,
    callback?: (row: DataRow<DataSelectionRow<T, S>>,
                selRow: DataSelectionRow<T, S>,
                s: S) => void,
    callback2?: (selRow: DataRow<DataSelectionRow<T, S>>) => void,
) {


}


function testSelection2<T,
    S extends DataSelection<T>>(
    type: Constructor<T>,
    selection: S,
    callback?: (row: DataSelectionRow2<T, S>,
                selRow: DataSelectionRow2<T, S>,
                s: S) => void,
) {


}


/*

    .select(s => s
        .field()
        .at("", s=> s)
        .at("")
        .as("ddd", s=>s
            .field("",1)
        )
    )

 */

