import { MuiTheme } from "@dabsi/browser/mui/MuiSystem";

export const maxDepth = 30;

export const MuiRichTextDepthPlugins = [] as ((
  depth: number,
  style: Record<string, any>,
  theme: MuiTheme
) => void)[];
