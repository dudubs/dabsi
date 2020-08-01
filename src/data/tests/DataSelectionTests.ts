import {AnyDataSelection, DataSelection} from "../DataSelection";


testm(__filename, () => {

    describe('childAt sanity:', () => {

        describe("picking:", () => {

            test("no-picks", {}, test => {

                test("xChild").toBeUndefined();

                test("dChild1").toBeUndefined();
            });

            test('pick and no-pick', {dPick: ["dText"]}, test => {

                test("xChild").toEqual(["dText"]);

                test("dChild1").toEqual(["dText"]);
            });

            test('pick and pick', {dPick: ["dText"], dChild1Pick: ["dText", "dText1Child"]}, test => {

                test("xChild").toEqual(["dText"]);

                test("dChild1").toEqual(["dText", "dText1Child"]);
            });

            test('no-pick and pick', {dChild1Pick: ["dText", "dText1Child"]}, test => {

                test("xChild").toBeUndefined();

                test("dChild1").toEqual(["dText", "dText1Child"]);
            });


            function test(title, options: { dPick?: string[], dChild1Pick?: string[] },
                          callback: (tester: (childKey: string) => jasmine.Matchers<any>) => void) {

                it(title, () => {
                    callback((childKey) => {
                        return expect(DataSelection.atChild({
                            pick: options.dPick,
                            children: {dChild1: {pick: options.dChild1Pick}}
                        }, childKey).pick)
                    });
                })


            }

        })

        it("relations", () => {

            const d = {
                pick: ["p_d"],
                fields: {p_d: 1},
                relations: {
                    oneDToOneE: {
                        pick: ["p_d_e"],
                        fields: {p_d_e: 1},
                        relations: {
                            oneEToOneF: {
                                pick: ["p_d_e_f"],
                                fields: {p_d_e_f: 1},
                                children: {
                                    fChild1: {
                                        pick: ["p_d_e_fChild1"],
                                        fields: {p_d_e_fChild1: 1}
                                    }
                                }
                            }
                        },
                        children: {
                            eChild1: {
                                pick: ["p_d_eChild1"],
                                fields: {p_d_eChild1: 1},
                                relations: {
                                    oneEToOneF: {
                                        pick: ["p_d_eChild1_f"],
                                        fields: {p_d_eChild1_f: 1},
                                        children: {
                                            fChild1: {
                                                pick: ["p_d_eChild1_fChild1"],
                                                fields: {p_d_eChild1_fChild1: 1}
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                children: {
                    dChild1: {
                        pick: ["p_dChild1"],
                        fields: {p_dChild1: 1},
                        relations: {
                            oneDToOneE: {
                                pick: ["p_dChild1_e"],
                                fields: {p_dChild1_e: 1},
                                relations: {
                                    oneEToOneF: {
                                        pick: ["p_dChild1_e_f"],
                                        fields: {p_dChild1_f: 1},
                                        children: {
                                            fChild1: {
                                                pick: ['p_dChild1_e_fChild1']
                                            }
                                        }
                                    }
                                },
                                children: {
                                    eChild1: {
                                        pick: ["p_dChild1_eChild1"],
                                        fields: {p_dChild1_eChild1: 1},
                                        relations: {
                                            oneEToOneF: {
                                                pick: ["p_dChild1_eChild1_f"],
                                                fields: {p_dChild1_eChild1_f: 1},
                                                children: {
                                                    fChild1: {
                                                        pick: ['p_dChild1_eChild1_fChild1']
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            };


            const dChild1 = DataSelection.atChild(d, "dChild1");

            const e = <AnyDataSelection>dChild1.relations!.oneDToOneE!;

            const eChild1 = DataSelection.atChild(e, "eChild1")

            const f = <AnyDataSelection>eChild1.relations!.oneEToOneF!;

            const fChild1 = DataSelection.atChild(f, "fChild1");

            expect([...dChild1.pick!].sort())
                .toEqual(["p_d", "p_dChild1"].sort());


            expectToBeEqualItems(eChild1.pick!, [
                "p_d_e",
                "p_d_eChild1",
                "p_dChild1_e",
                "p_dChild1_eChild1",
            ]);

            expectToBeEqualItems(fChild1.pick!, [
                "p_d_e_f",
                "p_d_e_fChild1",
                "p_d_eChild1_f",
                "p_d_eChild1_fChild1",
                "p_dChild1_e_f",
                "p_dChild1_e_fChild1",
                "p_dChild1_eChild1_f",
                "p_dChild1_eChild1_fChild1",
            ])

            function expectToBeEqualItems(a: any[], b: any[]) {

                for (const x of a) {
                    expect(b).toContain(x);
                }

                for (const x of b) {
                    expect(a).toContain(x);
                }
            }
        })

    });

    describe("merge", () => {
        const sPickKeys = {
            pick: ["z", "x"],
            fields: {x: 1}
        };
        const sPickAll = {
            fields: {x: 1}
        };


        test('pick-keys and pick-all', sPickKeys, {fields: {y: 1}}, s => {
            expect(s.pick).toEqual(["z", "x"]);
            expect(s.fields).toEqual({
                x: jasmine.anything(),
                y: jasmine.anything()
            })
        });

        test('pick-all and pick-all', sPickAll, {fields: {y: 1}}, s => {
            expect(s.pick).toBeUndefined()
            expect(s.omit).toBeUndefined()
            expect(s.fields).toEqual({
                x: jasmine.anything(),
                y: jasmine.anything()
            })
        });

        function test(title, a: AnyDataSelection, b: AnyDataSelection, callback: (s) => void) {
            it(title, () => {
                callback(DataSelection.merge(a, b))
            })

        }

    });

})
