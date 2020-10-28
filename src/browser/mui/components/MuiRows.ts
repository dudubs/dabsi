import { partialProps } from "../../../react/utils/partialProps";
import { MuiGrid } from "./MuiGrid";

export const MuiRows = partialProps(MuiGrid, { direction: "column" });
