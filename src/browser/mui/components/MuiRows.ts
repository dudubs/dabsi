import { partialProps } from "@dabsi/react/utils/partialProps";
import MuiGrid from "@dabsi/browser/mui/components/MuiGrid";

export const MuiRows = partialProps(MuiGrid, { direction: "column" });
