import RichTextModule from "@dabsi/system/rich-text";
declare global {
  namespace IRichText {
    interface BlockStyleTypes {
      align: StyleType<"CENTER" | "LEFT" | "RIGHT">;
    }

    interface BlockDataTypes {
      regular: DataType;

      header: DataType<{
        level: 1 | 2 | 3 | 4 | 5 | 6;
      }>;

      list: DataType<{
        ordered: boolean;
      }>;

      atomic: DataType<{
        position: "LEFT" | "RIGHT" | "CENTER" | undefined;
      }>;
    }
  }
}

const aligns = new Set<any>(["LEFT", "RIGHT", "CENTER"]);
const headerLevels = new Set([1, 2, 3, 4, 5, 6]);

export const initRichTextModule = (rtModule: RichTextModule) => {
  rtModule
    .defineBlock("regular", {
      pack: () => ({}),
    })
    .defineBlock("header", {
      pack: ({ level }) => ({ level: headerLevels.has(level) ? level : 6 }),
    })
    .defineBlock("list", {
      pack: ({ ordered }) => ({ ordered: Boolean(ordered) }),
    })
    .defineBlock("atomic", {
      pack: ({ position }) => ({
        position: aligns.has(position) ? position : undefined,
      }),
    })
    .defineBlockStyle("align", {
      pack(align) {
        return aligns.has(align) ? align : undefined;
      },
    });
};
