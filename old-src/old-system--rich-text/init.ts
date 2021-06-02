import RichTextModule from "@dabsi/system/rich-text";

const enumPacker = <T>(options: T[], defualtIsUndefined = false) => {
  const set = new Set(options);
  return type => {
    return set.has(type) ? type : defualtIsUndefined ? undefined : options[0];
  };
};
const packListType = enumPacker(["ORDERED", "UNORDERED"]);
const packHeaderLevel = enumPacker([6, 5, 4, 3, 2, 1]);
export const initRichTextModule = (rtModule: RichTextModule) => {
  rtModule
    .defineBlock("regular")
    .defineBlock("header", {
      pack: ({ level }) => ({ level: packHeaderLevel(level) }),
    })
    .defineBlock("list", {
      pack: ({ type }) => ({ type: packListType(type) }),
    })
    .defineBlock("atomic")
    .defineBlockStyle("align", {
      pack: enumPacker(["LEFT", "RIGHT", "CENTER"], true),
    });
};
