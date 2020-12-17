import { partialProps } from "@dabsi/react/utils/partialProps";
import { MuiGrid } from "@dabsi/browser/mui/components/MuiGrid";

export const MuiColumns = partialProps(MuiGrid, { direction: "row" });
