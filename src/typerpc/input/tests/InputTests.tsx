import * as React from "react";
import { mapObjectToArray } from "../../../common/object/mapObjectToArray";
import { Nullable } from "../../../common/typings";
import { TestConnection } from "../../../data/tests/TestConnection";
import { EmptyFragment } from "../../../react/utils/EmptyFragment";
import { ArrayInput } from "../ArrayInput";
import { ArrayInputView } from "../ArrayInputView";
import { BoolInput } from "../BoolInput";
import { EnumInput } from "../EnumInput";
import { InputError } from "../Input";
import { InputErrorHook, InputErrorHookView } from "../InputErrorHook";
import { InputMap } from "../InputMap";
import { InputMapView } from "../InputMapView";
import { NullableInputView } from "../NullableInputView";
import { OptionalInput } from "../OptionalInput";
import { RequiredInput } from "../RequiredInput";
import { TextInput } from "../TextInput";
import { TextInputView } from "../TextInputView";
import { testCase } from "./CaseTester";
import { RpcTester, testRpc } from "./RpcTester";
import { TestInput } from "./TestInput";
import { TestInputView } from "./TestInputView";
import objectContaining = jasmine.objectContaining;

describe("Input", () => {
  const t = new RpcTester(
    TestInput<{ Value: string; Error: "ERR1" | "ERR2" }>()
  );

  t.testConfig("default", undefined);

  t.testWidgetView(TestInputView, (t) => {
    t.testProps(
      "",
      (View, props) => (
        <View
          {...props}
          errorMap={{
            ERR1: "MAPPED_ERR1",
          }}
        />
      ),
      () => {
        t.test(
          "expect to errorElement for ERR1 will be MAPPED_ERR1.",
          async () => {
            await t.view.setError("ERR1");
            expect(t.view.error).toEqual("ERR1");
            expect(t.view.errorElement).toBeDefined();
          }
        );
        t.test(
          "expect to errorElement for ERR2 will be undefined.",
          async () => {
            await t.view.setError("ERR2");
            expect(t.view.error).toEqual("ERR2");
            expect(t.view.errorElement).toBeUndefined();
          }
        );
      }
    );
  });
});

describe("InputErrorHookView", () => {
  const t = new RpcTester(InputErrorHook<"HOOKED_ERROR">()(TextInput()));

  t.testConfig("undefined", undefined);

  t.testWidgetView(InputErrorHookView, (t) => {
    t.testProps("sanity", (View, props) => (
      <View
        {...props}
        errorMap={{ HOOKED_ERROR: "ERROR_BY_HOOK" }}
        children={(props, error) => (
          <TestInputView {...props} errorMap={{ REQUIRED: "ERROR_BY_INPUT" }} />
        )}
      />
    ));

    t.testInputError("HOOKED_ERROR", () => {
      expect(t.view.errorElement).toBeDefined();
      expect(t.view.target!.error).toBeUndefined();
    });

    t.testInputError("REQUIRED", () => {
      expect(t.view.errorElement).toBeUndefined();
      expect(t.view.target!.error).toBeDefined();
    });
  });
});

describe("NullableInput", () => {
  testCase("nullable", [true, false], (nullable) => {
    testRpc(
      EnumInput(["hello", "world"], {
        nullable,
      }),
      (t) => {
        t.testConfig("undefined", undefined);

        t.testInputValue("hello", "hello");
        t.testInputError("x" as any, "INVALID");

        if (nullable) {
          t.testInputValue(null as any, null);
        } else {
          t.testInputError(null as any, "REQUIRED");
        }
      }
    );
  });
});

describe("TextInput", () => {
  const t = new RpcTester(TextInput());

  t.testConfig("default", undefined);

  t.testConfig("default:hello", { default: "hello" }, () => {
    t.testWidgetElement((t) => {
      it('"expect to default"', () => {
        expect(t.element.default).toEqual("hello");
      });
    });
  });

  t.testConfig("required", { required: true, trim: true }, () => {
    t.testInputError("", "REQUIRED");
    t.testInputError(" ", "REQUIRED");
    t.testInputValue("x", "x");
  });
  t.testConfig(
    "default+trim+pattern",
    {
      trim: true,
      default: "hello",
      pattern: /^[^\d]+$/,
    },
    () => {
      t.testWidgetElement((e) => {
        it("expect to default", () => {
          expect(e.element.default).toEqual("hello");
        });
      });

      t.testInputValue(" world ", "world");

      t.testInputError("123", "INVALID_PATTERN");

      t.testWidgetView(TextInputView, (t) => {
        t.testProps("sanity", (View, props) => (
          <View {...props} children={(view) => EmptyFragment} />
        ));

        t.test("expect text is element value", () => {
          expect(t.view.text).toEqual("hello");
        });

        t.test("expect to setText debounce.", async () => {
          const p = t.view.setText("world");
          expect(t.view.value).not.toEqual("world");
          await p;
          expect(t.view.value).toEqual("world");
        });

        t.test("expect to setValue on validate.", async () => {
          const p = t.view.setText("world");
          expect(t.view.value).not.toEqual("world");
          await t.view.validate();
          expect(t.view.value).toEqual("world");
        });
      });
    }
  );
});

describe("OptionalInput", () => {
  const t = new RpcTester(OptionalInput(TextInput()));

  t.testConfig("sanity", { required: true, trim: true });

  t.testInputValue(" hello ", "hello");
  t.testInputError(" ", "REQUIRED");
  t.testInputValue(null, null);

  t.testWidgetView(NullableInputView, (t) => {
    t.testPropsWithState<string | Nullable>(
      "defaultNull",
      undefined,
      (View, props, state) => (
        <View
          {...props}
          value={state}
          target={(props) => <TestInputView {...props} />}
        />
      ),
      (setState) => {
        t.test("expect null to be valid value", async () => {
          setState(null);
          expect(t.view.value).toEqual(null);
          await t.view.validate();
          expect(t.view.error).toBeUndefined();
          expect(t.view.value).toEqual(null);
        });
      }
    );
  });
});

describe("InputMap", () => {
  const t = new RpcTester(
    InputMap({
      text1: TextInput(),
      text2: TextInput(),
    })
  );

  t.testConfig("default", {
    text1: { default: "hello" },
    text2: { default: "world" },
  });

  let text1Input: TestInputView;
  let text2Input: TestInputView;

  t.testWidgetView(InputMapView, (t) => {
    t.testProps("", (View, props) => (
      <View.Fields
        {...props}
        fields={{
          text1: (props) => (
            <TestInputView
              {...props}
              ref={(current) => (text1Input = current!)}
            />
          ),
          text2: (props) => (
            <TestInputView
              {...props}
              ref={(current) => (text2Input = current!)}
            />
          ),
        }}
      />
    ));

    t.test("", () => {
      expect(t.view.value).toEqual({
        text1: "hello",
        text2: "world",
      });
    });
  });
});

describe("ArrayInput", () => {
  const t = new RpcTester(
    ArrayInput(
      InputMap({
        text: TextInput(),
        isActive: BoolInput(),
      }),
      {
        newItem: TextInput(),
        isUniqueItem: true,
        getKeyFromItemData: (data) => data.text,
        getKeyFromNewItemData: (data) => data,
      }
    )
  );

  t.testConfig("default", {
    default: [
      { text: "hello", isActive: true },
      { text: "world", isActive: false },
    ],

    getItemValue: (text) => ({
      text,
      isActive: false,
    }),
  });

  let text: string | undefined;
  let isActive: boolean | undefined;

  // TODO: test remove,swap.
  t.testWidgetView(ArrayInputView, (t) => {
    t.testProps("sanity", (View, props) => {
      return (
        <View
          {...props}
          onChange={undefined}
          renderNewItem={(props) => (
            <TestInputView
              testValue={() => text ?? ""}
              testId={"new-item"}
              {...props}
              errorMap={{
                NOT_UNIQUE: "NOT_UNIQUE_NEW_ITEM",
              }}
            />
          )}
          renderItem={({ key, props: { ...props } }) => (
            <InputErrorHookView
              {...props}
              errorMap={{ NOT_UNIQUE: "NOT_UNIQUE_ITEM" }}
              children={(props) => (
                <InputMapView.Fields
                  {...props}
                  fields={{
                    text: (props) => (
                      <TestInputView {...props} testValue={() => text ?? ""} />
                    ),
                    isActive: (props) => (
                      <TestInputView
                        {...props}
                        testValue={() => isActive ?? false}
                      />
                    ),
                  }}
                />
              )}
            />
          )}
          children={(view) => (
            <>
              {view.renderItems()}
              {view.renderNewItem()}
            </>
          )}
        />
      );
    });

    beforeEach(() => {
      text = undefined;
      isActive = undefined;
    });

    t.testValidInputData((data) => {
      expect(data).toContain(
        objectContaining({
          text: "hello",
          isActive: true,
        })
      );

      expect(data).toContain(
        objectContaining({
          text: "world",
          isActive: false,
        })
      );
    });

    // focusNextTest();
    t.test("expect to unique error on adding a new item", async () => {
      text = "hello";
      await t.view.add();
      expect(t.view.newItemInput.error).toEqual("NOT_UNIQUE");
      expect(
        mapObjectToArray(t.view.children.keyToView, (v) => v.error).find(
          (e) => !!e
        )
      ).toBeUndefined();
    });

    t.test("expect unique error on changing exists item.", async () => {
      text = "world";
      await t.view.children.keyToView.hello.props.onChange?.(
        t.view.children.keyToView.hello
      );
      expect(t.view.newItemInput.error).toBeUndefined();
      expect(
        mapObjectToArray(t.view.children.keyToView, (v) => v.error)
          .filter((e) => e === "NOT_UNIQUE")
          .filter((e) => e!!)
      ).toEqual(["NOT_UNIQUE"]);
    });
  });
});

function typingsTests() {
  // ArrayInput
  {
    ArrayInput(TextInput(), {
      newItem: InputMap({
        text: TextInput(),
        isActive: BoolInput(),
      }),
      isUniqueItem: true,
      getKeyFromItemData: (data) => data,
      getKeyFromNewItemData: (data) => data.text,
    });

    // @ts-expect-error
    ArrayInput(TextInput(), {
      newItem: InputMap({
        text: TextInput(),
        isActive: BoolInput(),
      }),
      isUniqueItem: true,
      getKeyFromItemData: (data) => data,
    });

    ArrayInput(TextInput(), {
      isUniqueItem: true,
      getKeyFromItemData: (data) => data,
    });

    // @ts-expect-error
    ArrayInput(TextInput(), {
      isUniqueItem: true,
    });

    ArrayInput(TextInput(), {
      getKeyFromItemData: (data) => data,
    });
  }
}
