import { Waiter } from "@dabsi/common/async/Waiter";
import mergeProps, { _mergeProp } from "@dabsi/view/react/mergeProps";

type P = {
  onClick?(event: string): void;
  ref?: React.Ref<any>;
  className?: string;
};

it("merge callbacks", async () => {
  const w1 = Waiter<number>();
  const w2 = Waiter<number>();
  _mergeProp(
    () => {
      w1.resolve(1);
    },
    () => {
      w2.resolve(2);
    }
  )();
  expect(await w1).toEqual(1);
  expect(await w2).toEqual(2);
});

it("merge string", () => {
  expect(_mergeProp("hello", "world")).toEqual("hello world");
});

it("custom merger", () => {
  expect(
    mergeProps(
      <P>{
        className: "hello",
      },
      {
        className: { $merge: s => s?.toUpperCase() },
      }
    )
  ).toEqual(jasmine.objectContaining({ className: "HELLO" }));
});
