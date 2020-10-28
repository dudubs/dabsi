import { partialProps } from "../../../react/utils/partialProps";
import { MuiGrid } from "./MuiGrid";

export const MuiColumns = partialProps(MuiGrid, { direction: "row" });
