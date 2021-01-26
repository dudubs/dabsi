import { HasKeys } from "@dabsi/common/typings2/boolean";
import { Constructor } from "@dabsi/common/typings2/Constructor";
import { Expect } from "@dabsi/common/typings2/Expect";
import { IsNever } from "@dabsi/common/typings2/boolean/IsNever";
import { Pluck } from "@dabsi/common/typings2/Pluck";

import { DataExp } from "@dabsi/typedata/exp/exp";
import { AEntity, BEntity } from "@dabsi/typeorm/relations/tests/TestEntities";
import { DataRow } from "@dabsi/typedata/row";
import { DataSelection } from "@dabsi/typedata/selection/selection";
import { DataSelectionRow } from "@dabsi/typedata/selection/row";
import { DataSource } from "@dabsi/typedata/source";

import {
  DataUnion,
  WithDataUnionMetaChildren,
  DataUnionMetaChildrenKey,
} from "@dabsi/typedata/union";
import { MergeDataSelection } from "@dabsi/typedata/selection/merger";
import {
  MapRelation,
  DataRelationKeys,
  DataRelationTypeAt,
} from "@dabsi/typedata/relation";
import { DataInsert } from "@dabsi/typedata/value";
import {
  DEntity,
  DChild1,
  DUnion,
  EUnion,
} from "@dabsi/typedata/tests/BaseEntities";

pass(() => {
  // DataSelectionRow
  {
    type SR1 = DataSelectionRow<
      AEntity,
      {
        relations: {
          oneAToOneB: true;
        };
      }
    >;

    type test1 = [
      //
      SR1["oneAToOneC"],
      SR1["oneAToOneC"]["oneCToOneB"],
      SR1["oneAToOneB"]["oneBToOneA"]
    ];

    type SR2 = DataSelectionRow<
      SR1,
      Expect<
        DataSelection<SR1>,
        {
          pick: ["aText"];
        }
      >
    >;

    type SR3 = DataSelectionRow<
      AEntity,
      Expect<
        DataSelection<AEntity>,
        {
          pick: ["aText"];
          relations: {
            oneAToOneB: true;
          };
        }
      >
    >;

    tt<
      [
        //
        //
        Expect<DataRelationKeys<SR1>, "oneAToOneB">,
        Expect<DataRelationKeys<SR1>, "oneAToOneC">,
        Expect<DataRelationKeys<SR2>, "oneAToOneB">,
        Expect<DataRelationKeys<SR2>, "oneAToOneC">,
        //
        //
        Expect<
          DataSelection<AEntity>,
          // @ts-expect-error
          {
            pick: ["oneBToOneA"];
          }
        >,
        //
        //
        Expect<keyof SR1, "aText">,
        Expect<keyof SR1, "aNumber">,
        Expect<keyof SR1, "oneAToOneB">,
        //
        //
        Expect<keyof SR2, "aText">,
        Expect<
          keyof SR2,
          // @ts-expect-error
          "aNumber"
        >,
        Expect<keyof SR2, "oneAToOneB">,
        //
        //
        Expect<keyof SR3, "aText">,
        Expect<
          keyof SR3,
          // @ts-expect-error
          "aNumber"
        >,
        Expect<keyof SR3, "oneAToOneB">
      ]
    >();
  }
  // DataUnion
  {
    // BaseType
    {
      testType<DataSelectionRow<AEntity, { pick: ["aText"] }>>(t => {
        assertType<AEntity>(t.$baseType);
        // @ts-expect-error
        assertType<BEntity>(t.$baseType);

        testType<DataRow<typeof t>>(t => {
          assertType<AEntity>(t.$baseType);
          // @ts-expect-error
          assertType<BEntity>(t.$baseType);
        });
      });

      testType<DataSource<AEntity>>(async t => {
        (
          await t
            .pick([], {
              xText: ["x"],
            })
            .getOrFail()
        ).update({
          aText: "foo",
          // @ts-expect-error
          xText: "x",
        });
      });
    }

    // no children
    {
      class _DUnion extends DataUnion(DEntity, {
        relations: { oneDToManyE: EUnion },
      }) {}
    }

    testType<DUnion[DataUnionMetaChildrenKey]>(d => {
      void d.dChild1.dChild1Text;

      // @ts-expect-error
      void d.dChild1.x;
    });
  }

  // DataRow of Union
  {
    testType<DataRow<DUnion>>(d => {
      // @ts-expect-error
      assertType<WithDataUnionMetaChildren<any>>(d);

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
      function testPicks<L, R>(
        x: Pluck<MergeDataSelection<{ pick: L }, { pick: R }>, "pick">
      ) {}

      testPicks<undefined, undefined>(undefined);

      testPicks<(keyof { a; b })[], undefined>(["a", "b"]);
      testPicks<undefined, (keyof { a; b })[]>(["a", "b"]);

      testPicks<(keyof { a; b })[], (keyof { b; c })[]>(["a", "b", "c"]);

      // @ts-expect-error
      testPicks<(keyof { a; b })[], (keyof { b; c })[]>(["d"]);

      // @ts-expect-error
      testPicks<(keyof { a; b })[], undefined>(["c"]);

      // @ts-expect-error
      testPicks<undefined, (keyof { a; b })[]>(["c"]);
    }
  }

  // DataSelection of AEntity
  {
    // @ts-expect-error
    testSelection(AEntity, { relations: { x: true } } as const);

    testSelection(AEntity, { relations: { oneAToOneB: true } });

    testSelection(AEntity, { relations: { oneAToManyB: true } });

    testSelection(AEntity, {
      relations: { oneAToOneB: { relations: { oneBToManyA: true } } },
    });

    testSelection(AEntity, {
      relations: {
        oneAToOneB: {
          relations: {
            // @ts-expect-error
            x: true,
          },
        },
      },
    });

    // @ts-expect-error
    testSelection(AEntity, { children: { x: {} } } as const);

    testSelection(AEntity, {} as const, row => {
      void row.aText;

      void row.aId;
    });

    type XF<S> = IsNever<S> extends true ? {} : S;
    type X<T, S> = IsNever<S> extends true
      ? T
      : HasKeys<S> extends false
      ? T
      : Omit<T, DataUnionMetaChildrenKey | DataRelationKeys<T>> & {
          x: Pluck<S, "x">;
        } & {
            [K in DataRelationKeys<T>]: MapRelation<
              T[K],
              X<DataRelationTypeAt<T, K>, Pluck<Pluck<S, "relations">, K>>
            >;
          };

    testType<X<AEntity, {}>>(d => {});

    testType<
      DataRow<
        DataSelectionRow<
          AEntity,
          {
            fields: {};
            relations: {};
          }
        >
      >
    >(d => {});

    assertType<IsNever<Pluck<never, "x">>>(true);

    // @ts-expect-error
    assertType<IsNever<Pluck<never, "x">>>(false);

    testSelection(AEntity, { pick: ["aText"] } as const, (row, sr, s) => {
      void row.aText;

      // @ts-expect-error
      s.pick[0] === "x";

      s.pick[0] === "aText";

      // @ts-expect-error
      void row.x;

      // @ts-expect-error
      void row.aId;
    });

    testSelection(AEntity, { pick: [] }, row => {
      // @ts-expect-error
      void row.aText;

      // @ts-expect-error
      void row.aId;
    });

    assertType<keyof never>("x");
    testSelection(
      AEntity,
      {
        relations: {},
      } as const,
      (a, as, s) => {
        s;
      }
    );
    testSelection(
      AEntity,
      {
        fields: {
          ax: 1,
        },
        relations: {
          oneAToOneB: {
            pick: ["bId"],
            fields: {
              bx: 1,
            },
          },
          manyAToManyA: {
            fields: {
              bx: 1,
            },
          },
        },
      } as const,
      (a, as) => {
        as.oneAToOneBOwner?.bText;

        // @ts-expect-error
        void a.x;

        void a.ax;

        // @ts-expect-error
        void a.oneAToOneB?.x;

        void a.oneAToOneB?.bx;

        void a.oneAToOneB?.bId;

        // @ts-expect-error
        void a.oneAToOneB?.bText;

        void a.oneAToOneBOwner?.bText;

        // @ts-expect-error
        void a.oneAToOneBOwner?.bx;

        // @ts-expect-error
        void a.oneAToManyB?.[0].x;

        void a.manyAToManyA?.[0].bx;

        // @ts-expect-error
        void a.manyAToManyAOwner?.[0].bx;
      }
    );
  }

  // DataSelection of DUnion
  {
    // @ts-expect-error
    testSelection(DUnion, { children: { x: {} } });

    testSelection(DUnion, { children: { dChild1: {} } });

    testSelection(
      DEntity,
      {
        fields: {
          x_d: 1,
        },
        relations: {
          oneDToOneE: {
            fields: {
              x_d_e: 1,
            },
          },
        },
      } as const,
      (d, ds, s) => {
        // @ts-expect-error
        void ds.x;

        void ds.x_d;

        // @ts-expect-error
        void ds.oneDToOneE?.x;

        void ds.oneDToOneE?.x_d_e;

        // @ts-expect-error
        void d.x;

        void d.x_d;

        // @ts-expect-error
        void d.oneDToOneE?.x;

        void d.oneDToOneE?.x_d_e;
      }
    );
    testSelection(
      DataUnion(DEntity, {
        relations: {
          oneDToOneE: EUnion,
        },
      }),
      {
        fields: {
          x_d: 1,
        },
        relations: {
          oneDToOneE: {
            pick: ["eId"],
            fields: {
              x_d_e: 1,
            },
            children: {
              eChild1: {
                pick: ["eChild1Text", "eId"],
                fields: {
                  x_d_eChild1: 1,
                },
              },
            },
          },
        },
      } as const,
      (d, ds, s) => {
        s.relations.oneDToOneE;

        // @ts-expect-error
        void ds.x;

        void ds.x_d;

        // @ts-expect-error
        void d.x;

        void d.x_d;

        // @ts-expect-error
        void (d.oneDToOneE?.$type === "x");

        // @ts-expect-error
        void d.oneDToOneE?.x;

        void d.oneDToOneE?.x_d_e;

        // @ts-expect-error
        assertType<EUnion>(d.oneDToOneE!);

        void d.oneDToOneE!.x_d_e;

        // @ts-expect-error
        void d.oneDToOneE!.x;

        if (d.oneDToOneE?.$type === "eChild1") {
        }
      }
    );

    testType<
      MergeDataSelection<
        {
          pick: ["dId"];
          fields: {
            dX: 1;
          };
          relations: {
            oneDToOneE: {
              // names:
              // fields
              pick: ["eId"];
              fields: {
                eXByD: 1;
              };
              children: {
                eChild1: {
                  fields: {
                    eXByDByEChild1: 1;
                  };
                };
              };
            };
          };
        },
        {
          pick: ["dText", "dChild1Text"];
          fields: {
            dChild1X: 1;
          };
          relations: {
            oneDToOneE: {
              pick: ["eText"];
              fields: {
                eXByDChild1: 1;
              };
              children: {
                eChild1: {
                  pick: ["eChild1Text"];
                  fields: {
                    eXByDChild1ByEChild1: 1;
                  };
                };
              };
            };
          };
        }
      >
    >(s => {
      assertType<Pluck<typeof s.relations.oneDToOneE.pick, number>>(
        // @ts-expect-error
        "x"
      );

      assertType<Pluck<typeof s.relations.oneDToOneE.pick, number>>("eId");

      assertType<Pluck<typeof s.relations.oneDToOneE.pick, number>>("eText");

      assertType<
        Pluck<typeof s.relations.oneDToOneE.children.eChild1.pick, number>
      >(
        // @ts-expect-error

        "x"
      );

      assertType<
        Pluck<typeof s.relations.oneDToOneE.children.eChild1.pick, number>
      >("eChild1Text");

      // @ts-expect-error
      void s.relations.oneDToOneE.fields.x;

      void s.relations.oneDToOneE.fields.eXByD;

      void s.relations.oneDToOneE.fields.eXByDChild1;
    });

    testSelection(
      DUnion,
      {
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
              eXByD: 1,
            },
            children: {
              eChild1: {
                fields: {
                  eXByDByEChild1: 1,
                },
              },
            },
          },
        },
        children: {
          dChild1: {
            pick: ["dText", "dChild1Text"],
            fields: {
              dChild1X: 1,
            },
            relations: {
              oneDToOneE: {
                pick: ["eText"],
                fields: {
                  eXByDChild1: 1,
                },
                children: {
                  eChild1: {
                    pick: ["eChild1Text"],
                    fields: {
                      eXByDChild1ByEChild1: 1,
                    },
                  },
                },
              },
            },
          },
        },
      } as const,
      (d, ds) => {
        // @ts-expect-error
        void (d.$type === "x");

        void d.dId;

        // @ts-expect-error
        void d.dText;

        // @ts-expect-error
        void d.dChild1Text;

        void d.dX;

        // @ts-expect-error
        void d.dChild1X;

        // @ts-expect-error
        ds.$unionChildren.dChild1?.x;

        // @ts-expect-error
        ds.$unionChildren.dChild1?.$unionChildren;

        void ds.$unionChildren.dChild1.dId;

        if (d.$type === "dChild1") {
          const dChild1E = d.oneDToOneE;
          if (dChild1E) {
            void dChild1E.eId;

            void dChild1E.eText;

            // @ts-expect-error
            void dChild1E.eText2;

            // @ts-expect-error
            void dChild1E.eChild1Text;

            // @ts-expect-error
            void (dChild1E.$type === "x");

            if (dChild1E.$type === "eChild1") {
              void dChild1E.eText;

              void dChild1E.eChild1Text;
            }
          }
        }

        if (d.$type === "dChild1") {
          void d.dId;

          void d.dText;

          void d.dChild1Text;

          void d.dX;

          void d.dChild1X;
        } else if (d.$type === "dChild2") {
          void d.dId;

          // @ts-expect-error
          void d.dText;

          // @ts-expect-error
          void d.dChild1Text;

          void d.dX;

          // @ts-expect-error
          void d.dChild1X;
        }
      }
    );
  }

  // DataSelection of DUnion at *To*_E_E as eChild1
  {
    testSelection(DUnion, {
      relations: {
        oneDToOneE: {
          children: {
            // @ts-expect-error
            x: {},
          },
        },
      },
    });

    testSelection(DUnion, {
      relations: { oneDToOneE: { children: { eChild1: {} } } },
    });

    testSelection(DUnion, {
      relations: {
        oneDToManyE: {
          children: {
            // @ts-expect-error
            x: {},
          },
        },
      },
    });

    testSelection(DUnion, {
      relations: { oneDToManyE: { children: { eChild1: {} } } },
    });
  }
  // DataSelection of DUnion as dChild1 at  *To*_E_E as eChild1
  {
    testSelection(DUnion, {
      children: {
        dChild1: {
          relations: {
            oneDToOneE: {
              children: {
                // @ts-expect-error
                x: {},
              },
            },
          },
        },
      },
    });

    testSelection(DUnion, {
      children: {
        dChild1: { relations: { oneDToOneE: { children: { eChild1: {} } } } },
      },
    });
  }

  // DataSelectionRow of Union
  {
    test(DUnion, {}, d => {
      // @ts-expect-error
      assertKey(d, "x");

      assertType<string>(d.dText!);
    });

    test(
      DUnion,
      {
        relations: {
          oneDToOneE: {
            fields: { eField: 1 },
          },
        },
      },
      d => {
        // @ts-expect-error
        assertKey(d, "x");

        assertType<string>(d.dText!);
      }
    );

    function test<T, S extends DataSelection<T>>(
      type: new (...args: any[]) => T,
      selection: S,
      callback?: (row: DataSelectionRow<T, S>) => void
    ) {}
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
    testType(
      DataUnion(DEntity, {
        relations: {
          oneDToOneE: EUnion,
        },
        children: {
          dChild1: DataUnion(DChild1, {
            relations: {
              oneDChild1ToOneE: EUnion,
            },
          }),
        },
      }),
      d => {}
    );

    testType<DataRow<DUnion>>(d => {
      void d.dId;
      void d.dText;

      // @ts-expect-error
      void d.x;

      void d.oneDToOneE;

      void d.oneDToOneE?.$type;

      if (d.oneDToOneE) {
      }

      // @ts-expect-error
      void d.x;

      // @ts-expect-error
      void (d.$type === "x");

      // @ts-expect-error
      void d.dChild1Text;

      // @ts-expect-error
      void d.manyDChild1ToOneE;

      // @ts-expect-error
      void (d.oneDToOneE?.$type === "x");

      void (d.oneDToOneE?.$type === "eChild1");

      if (d.$type === "dChild1") {
        void d.dId;
        void d.dText;
        void d.dChild1Text;

        void d.oneDToOneE;
        void d.manyDChild1ToOneE;

        void d.oneDToOneE?.$type;
        void d.manyDChild1ToOneE?.$type;

        // @ts-expect-error
        void (d.oneDToOneE?.$type === "x");

        if (d.oneDToOneE?.$type === "eChild1") {
          void d.oneDToOneE?.eText;
          void d.oneDToOneE?.eChild1Text;

          // @ts-expect-error
          void d.oneDToOneE?.x;
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
      test({ $as: { dChild1: true } });
      test({ $as: { dChild1: { dText: "" } } });
      test({ $as: { dChild1: { dChild1Text: "" } } });
      test({ dText: "" });

      // @ts-expect-error
      testSelection({ x: "" });

      // @ts-expect-error
      test({ $as: { x: true } });

      // @ts-expect-error
      test({ $as: { dChild1: { x: "" } } });

      // @ts-expect-error
      testTypeExp(DataUnion(DEntity, {}), { $as: { dChild1: true } });

      {
        // $as dChild1
        testTypeExp(
          DataUnion(DEntity, {
            children: {
              dChild1: DChild1,
            },
          }),
          {
            $as: { dChild1: true },
          }
        );

        // $as dChild1 at oneDToOneE
        testTypeExp(
          DataUnion(DEntity, {
            children: {
              dChild1: DChild1,
            },
          }),
          {
            $as: {
              dChild1: {
                $at: { oneDToOneE: true },
              },
            },
          }
        );

        // $as dChild1 at oneDToOneE with relation
        testTypeExp(
          DataUnion(DEntity, {
            relations: { oneDToOneE: EUnion },
            children: { dChild1: DChild1 },
          }),
          {
            $as: {
              dChild1: {
                $at: { oneDToOneE: true },
              },
            },
          }
        );

        // $as dChild1 at oneDToOneE with child-relation
        testTypeExp(
          DataUnion(DEntity, {
            relations: { oneDToOneE: EUnion },
            children: {
              dChild1: DataUnion(DChild1, {
                relations: { oneDToOneE: EUnion },
              }),
            },
          }),
          {
            $as: {
              dChild1: {
                $at: { oneDToOneE: true },
              },
            },
          }
        );
      }
    }

    {
      // @ts-expect-error
      testTypeExp(AEntity, { $as: { x: true } });
    }

    // @ts-expect-error
    test({ $as: { dChild1: { $at: { x: true } } } });

    // $as dChild1 $at manyDChild1ToOneE ...
    {
      test({ $as: { dChild1: { $at: { manyDChild1ToOneE: true } } } });

      test({ $as: { dChild1: { $at: { manyDChild1ToOneE: { eText: "" } } } } });

      // @ts-expect-error
      test({ $as: { dChild1: { $at: { manyDChild1ToOneE: { x: "" } } } } });

      test({
        $as: {
          dChild1: {
            $at: {
              manyDChild1ToOneE: {
                $as: {
                  // @ts-expect-error
                  x: true,
                },
              },
            },
          },
        },
      });
    }
    // $as dChild1 $at manyDChild1ToOneE $as eChild1
    {
      test({
        $as: {
          dChild1: { $at: { manyDChild1ToOneE: { $as: { eChild1: true } } } },
        },
      });

      test({
        $as: {
          dChild1: {
            $at: { manyDChild1ToOneE: { $as: { eChild1: { eText: "" } } } },
          },
        },
      });

      test({
        $as: {
          dChild1: {
            $at: {
              manyDChild1ToOneE: { $as: { eChild1: { eChild1Text: "" } } },
            },
          },
        },
      });
    }
    // $as dChild1 $at manyDChild1ToOneE $at oneDToOneE
    {
      test({ $as: { dChild1: { $at: { oneDToOneE: true } } } });

      test({ $as: { dChild1: { $at: { oneDToOneE: { eText: "" } } } } });

      // @ts-expect-error
      test({ $as: { dChild1: { $at: { oneDToOneE: { x: "" } } } } });

      // @ts-expect-error
      test({ $as: { dChild1: { $at: { oneDToOneE: { eChild1Text: "" } } } } });
    }
    // $as dChild1 $at manyDChild1ToOneE $at oneDToOneE $as eChild1
    {
      // @ts-expect-error
      test({ $as: { dChild1: { $at: { oneDToOneE: { $as: { x: true } } } } } });

      test({
        $as: { dChild1: { $at: { oneDToOneE: { $as: { eChild1: true } } } } },
      });

      test({
        $as: {
          dChild1: {
            $at: {
              oneDToOneE: {
                $as: {
                  eChild1: {
                    // @ts-expect-error
                    x: "",
                  },
                },
              },
            },
          },
        },
      });

      test({ $as: { dChild1: { $at: { oneDToOneE: { eText: "" } } } } });

      test({
        $as: {
          dChild1: { $at: { oneDToOneE: { $as: { eChild1: { eText: "" } } } } },
        },
      });

      test({
        $as: {
          dChild1: {
            $at: { oneDToOneE: { $as: { eChild1: { eChild1Text: "" } } } },
          },
        },
      });
    }

    // $at oneDToOneE $as eChild1
    {
      test({ $at: { oneDToOneE: true } });

      // @ts-expect-error
      test({ $at: { oneDToOneE: { $as: { x: true } } } });

      test({ $at: { oneDToOneE: { $as: { eChild1: true } } } });

      test({ $at: { oneDToOneE: { $as: { eChild1: { eText: "" } } } } });

      test({ $at: { oneDToOneE: { $as: { eChild1: { eChild1Text: "" } } } } });

      // @ts-expect-error
      testSelection({ $at: { oneDToOneE: { $as: { eChild1: { x: "" } } } } });
    }

    function test(exp: DataExp<DUnion>) {}
  }

  // DataSource.as
  {
    testType<DataSource<DUnion>>(ds => {
      // @ts-expect-error
      ds.insertKey({ dChild1Text: "" });

      ds.insertKey({
        dId: "",
      });

      const x = new DUnion().$unionChildren.dChild1.$baseType;
      const a: DataInsert<typeof x> = {
        dId: "",
        dChild1Text: "",
      };

      ds.as("dChild1").insertKey({
        dId: "",
        dText: "",
        dChild1Text: "",
        dBoolean: false,
      });

      // TODO: test also DataSelection

      testType<
        DataSelectionRow<
          DUnion,
          {
            children: {
              dChild1: {
                relations: {};
              };
            };
            fields: {
              dX: 1;
            };
            relations: {};
          }
        >
      >(t => {
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

      testType<
        DataSelectionRow<
          DUnion,
          {
            children: {
              dChild1: {
                relations: {};
              };
            };
            relations: {};
          }
        >
      >(t => {
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
        fields: { dX: 1 },
      })
        .getOrFail()
        .then(row => {
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
    });
  }
});

function pass(...args) {}

function testTypeExp<T>(cls: new () => T, exp: DataExp<T>) {}

function assertType<T>(value: T) {}

function testType<T>(callback: (value: T) => void);
function testType<T>(value: T, callback: (value: T) => void);
function testType<T>() {}

function assertKey<T>(value: T, key: keyof Required<T>);
function assertKey<T>(key: keyof Required<T>);
function assertKey(...args) {}

testType<
  new () => DataUnion<
    DEntity,
    {
      dChild1: DChild1;
    },
    {
      // oneDToOneE:EUnion
    }
  >
>(d => {
  /*
  DataSelection<DUnion>()
      .field("", "")
      .as("dChild1", s=> {
          s.pick("")
          s.at("")
      })

   */

  testSelection(
    d,
    {} as const,
    () => {},
    s => {}
  );

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
});

function testSelection<T, S extends DataSelection<T>>(
  type: Constructor<T>,
  selection: S,
  callback?: (
    row: DataRow<DataSelectionRow<T, S>>,
    selRow: DataSelectionRow<T, S>,
    s: S
  ) => void,
  callback2?: (selRow: DataRow<DataSelectionRow<T, S>>) => void
) {}

declare function tt<T>();
