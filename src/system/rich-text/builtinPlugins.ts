import { RichTextModuleInstaller } from "@dabsi/system/rich-text";

export default function (installer: RichTextModuleInstaller) {
  installer.defineBlock("header", {
    pack: (_, { level }) => ([null, 1, 2, 3, 4, 5, 6] as const)[level] || 1,
    unpack: (_, level) => ({ level }),
  });
  installer.defineBlock("unstyled", {});
  installer.defineBlock("atomic", {});
}
