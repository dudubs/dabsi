import Dialog from "@material-ui/core/Dialog";
import {MUICss} from "../utils/MUICss";

export const MUIDialog = Dialog.let(MUICss`
    direction: ${theme => theme.direction};
`);

