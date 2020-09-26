import * as React from "react";
import { inspect } from "../../../logging";
import { focusNextTest } from "../../../typeorm/exp/tests/focusNextTest";
import { ArrayInput } from "../ArrayInput";
import { ArrayInputView } from "../ArrayInputView";
import { BoolInput } from "../BoolInput";
import { InputError } from "../Input";
import { InputErrorHook, InputErrorHookView } from "../InputErrorHook";
import { InputMap } from "../InputMap";
import { InputMapView } from "../InputMapView";
import { TextInput } from "../TextInput";
import { TextInputView } from "../TextInputView";
import { RpcTester } from "./RpcTester";
import { TestInput } from "./TestInput";
import { TestInputView } from "./TestInputView";

describe("InputErrorHookView", () => {
  const t = new RpcTester(InputErrorHook<"HOOKED_ERROR">()(TextInput()));

  t.testConfig("undefined", undefined);

  t.testWidgetView(InputErrorHookView, (t) => {
    t.testProps("sanity", (View, props) => (
      <View
        {...props}
        errorMap={{ HOOKED_ERROR: "ERROR_BY_HOOK" }}
        children={(props, error) => (
          <>
            <div id={"hook-error"}>{error}</div>
            <TestInputView
              {...props}
              errorMap={{ REQUIRED: "ERROR_BY_INPUT" }}
              children={(view) => (
                <div id={"input-error"}>{view.errorElement}</div>
              )}
            />
          </>
        )}
      />
    ));
    t.testInputError("HOOKED_ERROR", () => {
      expect(t.getStringById("hook-error")).toEqual("ERROR_BY_HOOK");

      expect(t.getStringById("input-error")).toEqual("");
    });

    t.testInputError("REQUIRED", () => {
      expect(t.getStringById("hook-error")).toEqual("");

      expect(t.getStringById("input-error")).toEqual("ERROR_BY_INPUT");
    });
  });
});

const TestStringInput = TestInput<{ Value: string; Error: "ERR1" | "ERR2" }>();
describe("TestInput", () => {
  const t = new RpcTester(TestStringInput);

  t.testConfig("default", undefined);

  t.testWidgetView(TestInputView, (t) => {
    t.testPropsWithState(
      "",
      { error: undefined as undefined | InputError<typeof t.connection> },
      (View, props, state) => (
        <View
          {...props}
          error={state.error}
          errorMap={{
            ERR1: "MAPPED_ERR1",
          }}
        />
      ),
      (setState) => {
        t.test("expect to updateError from props.", async () => {
          await t.act(() => setState({ error: "ERR1" }));
          expect(t.view.error).toEqual("ERR1");
          expect(t.getStringById("error")).toEqual("MAPPED_ERR1");
        });
        t.test(
          "expect to errorElement for ERR1 will be MAPPED_ERR1.",
          async () => {
            await t.act(() => t.view.setError("ERR1"));
            expect(t.view.error).toEqual("ERR1");
            expect(t.getStringById("error")).toEqual("MAPPED_ERR1");
          }
        );
        t.test(
          "expect to errorElement for ERR2 will be undefined.",
          async () => {
            await t.act(() => t.view.setError("ERR2"));
            expect(t.view.error).toEqual("ERR2");
            expect(t.getStringById("error")).toEqual("");
          }
        );
      }
    );
  });
});

describe("TextInput", () => {
  const t = new RpcTester(TextInput());

  t.testConfig("default", undefined);

  t.testConfig("default:hello", { default: "hello" }, () => {
    t.testWidgetElement("expect to default", (e) => {
      expect(e.default).toEqual("hello");
    });
  });

  t.testConfig(
    "default+trim+pattern",
    {
      trim: true,
      default: "hello",
      pattern: /^[^\d]+$/,
    },
    () => {
      t.testWidgetElement("expect to default", (e) => {
        expect(e.default).toEqual("hello");
      });

      t.testInputValue(" world ", "world");

      t.testWidgetView(TextInputView, (t) => {
        t.testProps("sanity", (View, props) => (
          <View
            {...props}
            errorMap={{ INVALID_PATTERN: "BAD_PATTERN" }}
            children={(view) => (
              <>
                <div id={"error"}>{view.errorElement}</div>
                <div id={"text"}>{view.text}</div>
              </>
            )}
          />
        ));

        t.test("expect text is element value", () => {
          expect(t.view.text).toEqual("hello");
        });
        t.test("expect value is element value", () => {
          expect(t.view.value).toEqual("hello");
        });
        t.test("expect to getCheckedData setValue to text.", async () => {
          await t.act(() => {
            t.view.setText("world");
          });
          expect(t.view.value).toEqual("hello");
          await t.view.getCheckedData();
          expect(t.view.value).toEqual("world");
        });
        // focusNextTest();
        t.testInputError("INVALID_PATTERN", () => {
          expect(t.getStringById("error")).toEqual("BAD_PATTERN");
        });
      });

      t.testInputError("123", "INVALID_PATTERN");
    }
  );
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
      <View
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

fdescribe("ArrayInput", () => {
  const t = new RpcTester(
    ArrayInput(
      InputMap({
        text: TextInput(),
        isActive: BoolInput(),
      }),
      {
        newItem: TextInput(),
        isUniqueItem: true,
        getKeyFromItem: (data) => data.text,
        getKeyFromNewItem: (data) => data,
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

  t.testWidgetView(ArrayInputView, (t) => {
    t.testProps("sanity", (View, props) => {
      return (
        <View
          {...props}
          onChange={undefined}
          renderNewItem={(props) => (
            <TestInputView
              testData={() => text ?? ""}
              testId={"new-item"}
              {...props}
              errorMap={{
                NOT_UNIQUE: "NOT_UNIQUE_NEW_ITEM",
              }}
            />
          )}
          renderItem={({ props: { itemKey, ...props } }) => (
            <InputErrorHookView
              {...props}
              errorMap={{ NOT_UNIQUE: "NOT_UNIQUE_ITEM" }}
              children={(props, error) => {
                return (
                  <>
                    <div id={"item-error:" + itemKey}>{error}</div>
                    <InputMapView
                      {...props}
                      fields={{
                        text: (props) => (
                          <TestInputView
                            {...props}
                            testData={() => text ?? ""}
                          />
                        ),
                        isActive: (props) => (
                          <TestInputView
                            {...props}
                            testData={() => isActive ?? false}
                          />
                        ),
                      }}
                    />
                  </>
                );
              }}
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
      expect(data.hello).toEqual({
        text: "hello",
        isActive: true,
      });

      expect(data.world).toEqual({
        text: "world",
        isActive: false,
      });
    });

    t.test("expect to unique error on adding a new item", async () => {
      text = "hello";
      await t.act(() => t.view.add());
      expect(t.getStringById("item-error:hello")).toEqual("");
      expect(t.getStringById("item-error:world")).toEqual("");
      expect(t.getStringById("new-item:error")).toEqual("NOT_UNIQUE_NEW_ITEM");
    });

    t.test("expect unique error on changing exists item.", async () => {
      text = "world";
      await t.act(() => t.view.onItemChange("hello"));
      expect(t.getStringById("item-error:hello")).toEqual("NOT_UNIQUE_ITEM");
      expect(t.getStringById("item-error:world")).toEqual("");
      expect(t.getStringById("new-item:error")).toEqual("");
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
      getKeyFromItem: (data) => data,
      getKeyFromNewItem: (data) => data.text,
    });

    // @ts-expect-error
    ArrayInput(TextInput(), {
      newItem: InputMap({
        text: TextInput(),
        isActive: BoolInput(),
      }),
      isUniqueItem: true,
      getKeyFromItem: (data) => data,
    });

    ArrayInput(TextInput(), {
      isUniqueItem: true,
      getKeyFromItem: (data) => data,
    });

    // @ts-expect-error
    ArrayInput(TextInput(), {
      isUniqueItem: true,
    });

    ArrayInput(TextInput(), {
      getKeyFromItem: (data) => data,
    });
  }
}
