import {jssPreset} from "@material-ui/styles";
import {create} from "jss";
import rtl from "jss-rtl";

export const MuiJss = create({

    plugins: [
        ... jssPreset().plugins,
        rtl()
    ]
});
