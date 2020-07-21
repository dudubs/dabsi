import {Connection} from "typeorm";
import {AEntity, BEntity, CEntity} from "../../../typeorm/relations/tests/Entities";
import {
    ABase,
    AChild1,
    AChild1Child1,
    AChild2,
    AUnion,
    BBase,
    BChild1,
    BChild1Child1,
    BChild2
} from "../../tests/BaseEntities";
import {TestConnection} from "../../tests/TestConnection";
import {getEntityDataInfo} from "../getEntityDataInfo";
import {EntityDataSelectorTester} from "./EntityDataSelectorTester";
import objectContaining = jasmine.objectContaining;


const getConnection = TestConnection([
    ABase, AChild1, AChild2, AChild1Child1,
    BBase, BChild1, BChild2, BChild1Child1,

    AEntity, BEntity, CEntity
]);

let connection: Connection;

it('EntityDataInfo.nonRelationColumnsPropertyName', () => {
    const aBaseInfo = getEntityDataInfo(connection.getMetadata(ABase));
    const aChild1Info = getEntityDataInfo(connection.getMetadata(AChild1));
    const aChild1Child1Info = getEntityDataInfo(connection.getMetadata(AChild1Child1));
    const aChild2Info = getEntityDataInfo(connection.getMetadata(AChild2));

    expect(aBaseInfo.nonRelationColumnsPropertyName).toContain("aText");
    expect(aChild1Info.nonRelationColumnsPropertyName).toContain("aText");
    expect(aChild1Child1Info.nonRelationColumnsPropertyName).toContain("aText");
    expect(aChild2Info.nonRelationColumnsPropertyName).toContain("aText");

    expect(aBaseInfo.nonRelationColumnsPropertyName).not.toContain("aChild1Text");
    expect(aChild1Info.nonRelationColumnsPropertyName).toContain("aChild1Text");
    expect(aChild1Child1Info.nonRelationColumnsPropertyName).toContain("aChild1Text");


    expect(aBaseInfo.nonRelationColumnsPropertyName).not.toContain("aChild1Child1Text");
    expect(aChild1Info.nonRelationColumnsPropertyName).not.toContain("aChild1Child1Text");
    expect(aChild1Child1Info.nonRelationColumnsPropertyName).toContain("aChild1Child1Text");


    expect(aChild2Info.nonRelationColumnsPropertyName).toContain("aText");
    expect(aChild2Info.nonRelationColumnsPropertyName).toContain("aChild2Text");
    expect(aChild2Info.nonRelationColumnsPropertyName).not.toContain("aChild1Text");
    expect(aChild2Info.nonRelationColumnsPropertyName).not.toContain("aChild1Child1Text");
})


beforeAll(async () => {

    connection = getConnection();


    await connection.getRepository(AChild1).let(repo =>
        repo.save([
            repo.create({
                aText: "AChild1.text",
                aChild1Text: "AChild1.aChild1Text",
                aChild1Text2: "AChild1.aChild1Text2"
            })
        ])
    );

    await connection.getRepository(AChild2).let(repo =>
        repo.save([
            repo.create({
                aText: "AChild2.text",
                aChild2Text: "AChild2.aChild1Text",
            })
        ])
    );

    await connection.getRepository(ABase).let(repo =>
        repo.save([
            repo.create({
                aText: "ABase.aText"
            })
        ])
    )

    await connection.getRepository(AEntity).let(repo =>
        repo.save([
            repo.create({
                aText: "AText",
                aNumber: 123
            })
        ])
    )
})

{
    const tester = new EntityDataSelectorTester(getConnection, {}, AUnion);

    describe('pick-all', () => {
        tester.testSelection({}, tester => {
            tester.ofEntityType(AChild1).testRow(row => {
                assertRow(row, {
                    aId: true,
                    aText: true,
                    aChild1Text: true,
                    aChild1Text2: true
                })
            })
        });
    });

    describe('pick-keys and pick-all', () => {
        tester.testSelection({pick: ["aText"]}, tester => {
            tester.ofEntityType(AChild1).testRow(row => {
                assertRow(row, {
                    aId: false,
                    aText: true,
                    aChild1Text: false,
                    aChild1Text2: false
                })
            })
        });
    });
    describe('pick-keys and pick-keys', () => {
        tester.testSelection({
            pick: ["aText"], unions: {
                aChild1: {pick: ["aChild1Text"]}
            }
        }, tester => {
            tester.ofEntityType(AChild1).testRow(row => {
                assertRow(row, {aId: false, aText: true, aChild1Text: true, aChild1Text2: false})
            })
        });
    });
    describe('pick-keys and omit-all', () => {
        tester.testSelection({
            pick: ["aText"], unions: {
                aChild1: {omit: "all"}
            }
        }, tester => {
            tester.ofEntityType(AChild1).testRow(row => {
                assertRow(row, {
                    aId: false,
                    aText: true,
                    aChild1Text: false,
                    aChild1Text2: false
                })
            })
        });
    });
    describe('pick-keys and omit-keys of child', () => {
        tester.testSelection({
            pick: ["aText"], unions: {
                aChild1: {omit: ["aChild1Text"]}
            }
        }, tester => {
            tester.ofEntityType(AChild1).testRow(row => {
                assertRow(row, {aId: false, aText: true, aChild1Text: false, aChild1Text2: true})
            })
        });
    });
    describe('pick-keys and omit-keys of parent', () => {
        tester.testSelection({
            pick: ["aText"], unions: {
                aChild1: {omit: ["aId"]}
            }
        }, tester => {
            tester.ofEntityType(AChild1).testRow(row => {
                assertRow(row, {aId: false, aText: true, aChild1Text: true, aChild1Text2: true})
            })
        });
    });
    describe('pick-keys and omit-keys of parent & child', () => {
        tester.testSelection({
            pick: ["aText"], unions: {
                aChild1: {omit: ["aChild1Text", "aText"]}
            }
        }, tester => {
            tester.ofEntityType(AChild1).testRow(row => {
                assertRow(row, {
                    aId: false,
                    aText: false,
                    aChild1Text: false,
                    aChild1Text2: true
                })
            })

            tester.ofEntityType(AChild2).testRow(row => {
                assertRow(row, {
                    aId: false,
                    aText: true,
                    aChild1Text: false,
                    aChild1Text2: false,
                    aChild2Text: false
                })
            })
        });
    })

    describe('omit-all and pick-all', () => {
        tester.testSelection({omit: "all"}, tester => {
            tester.ofEntityType(AChild1).testRow(row => {
                assertRow(row, {aId: false, aText: false, aChild1Text: true, aChild1Text2: true})
            })
        });
    });
    describe('omit-all and omit-all', () => {
        tester.testSelection({
            omit: "all", unions: {
                aChild1: {omit: "all"}
            }
        }, tester => {
            tester.ofEntityType(AChild1).testRow(row => {
                assertRow(row, {aId: false, aText: false, aChild1Text: false, aChild1Text2: false})
            })
        });
    });
    describe('omit-all and omit-keys of child', () => {
        tester.testSelection({
            omit: "all", unions: {
                aChild1: {omit: ["aChild1Text"]}
            }
        }, tester => {
            tester.ofEntityType(AChild1).testRow(row => {
                assertRow(row, {aId: false, aText: false, aChild1Text: false, aChild1Text2: true})
            })
        });
    });
    describe('omit-all and omit-keys of parent', () => {
        tester.testSelection({omit: "all", unions: {aChild1: {omit: ["aText"]}}}, tester => {
            tester.ofEntityType(AChild1).testRow(row => {
                assertRow(row, {aId: false, aText: false, aChild1Text: true, aChild1Text2: true})
            })
        });
    });
    describe('omit-all and omit-keys of parent & child', () => {
        tester.testSelection({omit: "all", unions: {aChild1: {omit: ["aId", "aText"]}}}, tester => {
            tester.ofEntityType(AChild1).testRow(row => {
                assertRow(row, {aId: false, aText: false, aChild1Text: true, aChild1Text2: true})
            })
        });
    });

    describe('omit-keys and pick-all', () => {
        tester.testSelection({omit: ["aText"]}, tester => {
            tester.ofEntityType(AChild1).testRow(row => {
                assertRow(row, {aId: true, aText: false, aChild1Text: true, aChild1Text2: true})
            })
        });
    });
    describe('omit-keys and pick-keys of child', () => {
        tester.testSelection({
            omit: ["aText"], unions: {
                aChild1: {pick: ["aChild1Text"]}
            }
        }, tester => {
            tester.ofEntityType(AChild1).testRow(row => {
                assertRow(row, {aId: false, aText: false, aChild1Text: true, aChild1Text2: false})
            });
            tester.ofEntityType(AChild2).testRow(row => {
                assertRow(row, {aId: true, aText: false, aChild2Text: true, aChild1Text2: false})
            });
        });
    });
    describe('omit-keys and pick-keys of parent', () => {
        tester.testSelection({
            omit: ["aText"], unions: {
                aChild1: {pick: ["aId"]}
            }
        }, tester => {
            tester.ofEntityType(AChild1).testRow(row => {
                assertRow(row, {aId: true, aText: false, aChild1Text: false, aChild1Text2: false})
            });
            tester.ofEntityType(AChild2).testRow(row => {
                assertRow(row, {aId: true, aText: false, aChild2Text: true, aChild1Text2: false})
            });
        });
    });
    describe('omit-keys and pick-keys of parent & child', () => {
        tester.testSelection({
            omit: ["aText"], unions: {
                aChild1: {pick: ["aId", "aText"]}
            }
        }, tester => {
            tester.ofEntityType(AChild1).testRow(row => {
                assertRow(row, {aId: true, aText: true, aChild1Text: false, aChild1Text2: false})
            });
            tester.ofEntityType(AChild2).testRow(row => {
                assertRow(row, {aId: true, aText: false, aChild2Text: true, aChild1Text2: false})
            });
        });
    });

    describe('omit-keys and omit-all', () => {
        tester.testSelection({omit: ["aText"]}, tester => {
            tester.testSelection({omit: ["aText"], unions: {aChild1: {omit: "all"}}}, tester => {
                tester.ofEntityType(AChild1).testRow(row => {
                    assertRow(row, {aId: true, aText: false, aChild1Text: false, aChild1Text2: false})
                })
            });
        });
    });
    describe('omit-keys and omit-keys of child', () => {
        tester.testSelection({omit: ["aText"], unions: {aChild1: {omit: ["aChild1Text"]}}}, tester => {
            tester.ofEntityType(AChild1).testRow(row => {
                assertRow(row, {aId: true, aText: false, aChild1Text: false, aChild1Text2: true})
            })
        });
    });
    describe('omit-keys and omit-keys of parent', () => {
        tester.testSelection({omit: ["aText"], unions: {aChild1: {omit: ["aId"]}}}, tester => {
            tester.ofEntityType(AChild1).testRow(row => {
                assertRow(row, {aId: false, aText: false, aChild1Text: true, aChild1Text2: true})
            })
        });
    });
    describe('omit-keys and omit-keys of parent & child', () => {
        tester.testSelection({omit: ["aText"], unions: {aChild1: {omit: ["aId", "aChild1Text"]}}}, tester => {
            tester.ofEntityType(AChild1).testRow(row => {
                assertRow(row, {aId: false, aText: false, aChild1Text: false, aChild1Text2: true})
            })
        });
    });


    function assertRow(row, flags: {
        aId?: boolean,
        aText?: boolean,
        aChild1Text?: boolean,
        aChild2Text?: boolean,
        aChild1Text2?: boolean
    }) {

        assertText('aId');
        assertText('aText');
        assertText('aChild1Text');
        assertText('aChild2Text');
        assertText('aChild1Text2');

        function assertDefined(key: keyof typeof flags) {
            if (flags[key] === true) {
                expect(row[key]).toBeDefined(String)
            } else if (flags[key] === false) {
                expect(row[key]).toBeUndefined();
            }
        }

        function assertText(key: keyof typeof flags) {
            if (flags[key] === true) {
                expect(row).toEqual(objectContaining({
                    [key]: jasmine.any(String)
                }))
            } else if (flags[key] === false) {

                expect(row).not.toEqual(objectContaining({
                    [key]: jasmine.anything()
                }))
            }

        }

    }

}

{
    const tester = new EntityDataSelectorTester(getConnection, {}, AEntity);

    tester.testSelection({}, tester => {
        tester.testRow(row => {
            expect(row.aText).toBeInstanceOf(String);
            expect(row.aNumber).toBeInstanceOf(Number);
        });
    });


    tester.testSelection({omit: "all"}, tester => {
        tester.testRow(row => {
            expect(row.aText).toBeUndefined();
            expect(row.aNumber).toBeUndefined();
        });
    });

    tester.testSelection({omit: ["aText"]}, tester => {
        tester.testRow(row => {
            expect(row.aText).toBeUndefined();
            expect(row.aNumber).toBeInstanceOf(Number);
        });
    });

    tester.testSelection({pick: ["aText"]}, tester => {
        tester.testRow(row => {
            expect(row.aText).toBeInstanceOf(String);
            expect(row.aNumber).toBeUndefined();
        });
    });

}
