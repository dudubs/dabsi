import { type } from "@dabsi/common/typings2/Typing";
import { AdminRpc } from "@dabsi/system/admin/common";
import { RichTextInput } from "@dabsi/system/rich-text/common/input";
import { InputMap } from "@dabsi/old-typerpc/input/input-map/InputMap";
import { TextInput } from "@dabsi/old-typerpc/input/text-input/TextInput";
import { RpcFn } from "@dabsi/old-typerpc/rpc-fn/RpcFn";
import { RpcMap } from "@dabsi/old-typerpc/rpc-map/RpcMap";
import { RpcParameter } from "@dabsi/old-typerpc/rpc-parameter/rpc";
import { DataTable } from "@dabsi/old-typerpc/data-table/rpc";
import { Form } from "@dabsi/old-typerpc/widget/form/rpc";

const _PageForm = Form({
  input: InputMap({
    title: TextInput(),
    content: RichTextInput(),
  }),
});

export const ContentCategoryInput = InputMap({
  title: TextInput(),
  // TODO: parent
});

export const ContentCategoryAddForm = Form({
  input: ContentCategoryInput,
  value: type as { $key: string },
});

export const ContentCategoryTable = DataTable({
  title: String,
  countChildren: Number,
});

export type ContentCategoryData = {
  path: {
    $key: string;
    title: string;
  }[];
};

export const [ContentAdminRpc, ContentAdminConnection] = AdminRpc.register(
  "content",
  RpcMap({
    pages: RpcMap({
      create: _PageForm,
      edit: RpcParameter(String, _PageForm),
      table: DataTable({
        title: String,
      }),
    }),

    categories: RpcMap({
      add: ContentCategoryAddForm,

      item: RpcParameter(
        String,
        RpcMap({
          delete: RpcFn<(moveTo: null | string) => void>(),
          get: RpcFn<() => ContentCategoryData>(),
          table: ContentCategoryTable,
          add: ContentCategoryAddForm,
          edit: Form({
            input: ContentCategoryInput,
          }),
        })
      ),
      table: ContentCategoryTable,
    }),
  })
);
