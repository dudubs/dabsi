import { partialProps } from "@dabsi/view/react/utils/partialProps";
import MuiGrid from "@dabsi/browser/mui/components/MuiGrid";

export const MuiRows = partialProps(MuiGrid, { direction: "column" });
