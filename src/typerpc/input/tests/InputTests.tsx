import * as React from "react";
import { Dispatch, SetStateAction, useState } from "react";
import { EmptyFragment } from "../../../react/utils/EmptyFragment";
import { ReactHook } from "../../../react/utils/ReactHook";
import { ArrayInput } from "../ArrayInput";
import { ArrayInputView } from "../ArrayInputView";
import { BoolInput } from "../BoolInput";
import { InputErrorHook, InputErrorHookView } from "../InputErrorHook";
import { InputMap } from "../InputMap";
import { InputMapView } from "../InputMapView";
import { TextInput } from "../TextInput";
import { TextInputView } from "../TextInputView";
import { CaseTester } from "./CaseTester";
import { RpcTester } from "./RpcTester";
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

describe("TextInput", () => {
  const t = new RpcTester(TextInput());

  t.testConfig("undefined", undefined);

  t.testConfig("default", { default: "hello" }, () => {
    t.testWidgetElement("expect to default", (e) => {
      expect(e.default).toEqual("hello");
    });
  });

  t.testConfig("default+trim+pattern", {
    trim: true,
    default: "hello",
    pattern: /^[^\d]+$/,
  });

  t.testInputData("expect to trim without error", " world ", (result) => {
    expect(result).toEqual({ value: "world" });
  });

  t.testInputData("expect to pattern error", "123", (result) => {
    expect(result).toEqual({ error: "INVALID_PATTERN", value: "123" });
  });

  t.testWidgetView(TextInputView, (t) => {
    t.testProps("sanity", (View, props) => (
      <View
        {...props}
        errorMap={{ INVALID_PATTERN: "BAD_PATTERN" }}
        children={(view) => (
          <>{view.error && <div id={"error"}>{view.errorElement}</div>}</>
        )}
      />
    ));
    t.testInputError("INVALID_PATTERN", () => {
      expect(t.getStringById("error")).toEqual("BAD_PATTERN");
    });
  });
});

describe("InputMap", () => {
  const t = new RpcTester(
    InputMap({
      text: TextInput(),
    })
  );

  t.testConfig("undefined", undefined);

  t.testWidgetView(InputMapView, (t) => {
    let textInput: TestInputView | undefined;

    t.testProps("empty-fields", (View, props) => (
      <View
        {...props}
        fields={{
          text: (props) => EmptyFragment,
        }}
      />
    ));

    t.testPropsWithState(
      "sanity",
      true,
      (View, props, state) => (
        <View
          {...props}
          fields={{
            text: (props) =>
              !state ? (
                EmptyFragment
              ) : (
                <TestInputView
                  {...props}
                  ref={(current) => {
                    textInput = current ?? undefined;
                  }}
                  testErrorId={"textError"}
                  testData={"hello"}
                  testFreezeElement={(element) => ({
                    ...element,
                    default: "frozenHello",
                  })}
                />
              ),
          }}
        />
      ),
      (setState) => {
        t.test(() => {
          beforeEach(() => {
            expect(textInput).toBeDefined();
          });
          it("expect to hello before change", async () => {
            expect(await t.getInputData().then((a) => a.text)).toEqual("hello");
          });

          it("expect to frozenHello afterChange", async () => {
            textInput!.props.onChange!(textInput!);
            expect(await t.getInputData().then((a) => a.text)).toEqual("hello");
            await t.act(() => setState(false));
            expect(await t.getInputData().then((a) => a.text)).toEqual(
              "frozenHello"
            );
          });
        });

        t.testInputError(
          {
            text: "INVALID_PATTERN",
          },
          () => {
            expect(t.getStringById("textError")).toEqual("INVALID_PATTERN");
          }
        );
      }
    );

    t.testInputValidData(({ value }) => {
      expect(value?.text).toBeInstanceOf(String);
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
              {...props}
              testData={() => text || ""}
              errorMap={{
                NOT_UNIQUE: "NOT_UNIQUE_NEW_ITEM",
              }}>
              {(view) => (
                <>
                  <div id={"new-item-error"}>{view.errorElement}</div>
                </>
              )}
            </TestInputView>
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
                            testData={(e) => text ?? e?.default ?? ""}
                          />
                        ),
                        isActive: (props) => (
                          <TestInputView
                            {...props}
                            testData={(e) => isActive ?? e?.default ?? false}
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

    t.testInputValidData((data) => {
      expect(data.value!.hello).toEqual({
        text: "hello",
        isActive: true,
      });

      expect(data.value!.world).toEqual({
        text: "world",
        isActive: false,
      });
    });

    t.testAct(
      "expect unique error on adding new item",
      () => {
        text = "hello";
        return t.view.add();
      },
      () => {
        expect(t.getStringById("item-error:hello")).toEqual("");
        expect(t.getStringById("item-error:world")).toEqual("");
        expect(t.getStringById("new-item-error")).toEqual(
          "NOT_UNIQUE_NEW_ITEM"
        );
      }
    );

    t.testAct(
      "expect unique error on item change.",
      () => {
        text = "world";
        return t.view.onItemChange("hello");
      },
      () => {
        expect(t.getStringById("item-error:hello")).toEqual("NOT_UNIQUE_ITEM");
        expect(t.getStringById("item-error:world")).toEqual("");
        expect(t.getStringById("new-item-error")).toEqual("");
      }
    );
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
