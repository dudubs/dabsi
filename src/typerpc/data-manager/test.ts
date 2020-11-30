import { testMetaType } from "../../common/MetaType";
import { RpcConnection } from "../Rpc";
import { AnyDataManager } from "./DataManager";

const dm = (null as unknown) as RpcConnection<AnyDataManager>;
const f = dm.edit("x").map.form;

testMetaType(dm.edit("x").map.form, t => {
  t.TRpc.Children.input;

  // @ts-expect-error
  t.TRpc.Children.inputx;
});
testMetaType(dm.edit("x").map, t => {
  testMetaType(t.TRpc.Children.form, t => {
    // @ts-expect-error
    t.TRpc.Children.inputx;

    t.TRpc.Children.input;
  });
  // @ts-expect-error
  t.TRpc.Children.form.children.inputx;
  t.TRpc.Children.form.children.input;
});
testMetaType(dm.edit("x"), t => {
  // @ts-expect-error
  t.TRpc.Children.map.children.form.children.inputx;
  t.TRpc.Children.map.children.form.children.input;
});
testMetaType(dm, t => {
  const x =
    t.TRpc.Children.edit.children.target.children.map.children.form.children;
  // @ts-expect-error
  x.inputx;

  x.input;
});
