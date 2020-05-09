import {jssPreset} from "@material-ui/core/styles";
import {create} from "jss";
import rtl from "jss-rtl";

const preset = jssPreset();

export const MUIJss = create({

    plugins: [
        ...preset.plugins,
        rtl()
    ]
});
