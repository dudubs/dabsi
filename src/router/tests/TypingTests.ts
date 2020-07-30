import {Router} from "../Router";


function test() {
    const r = Router.route("child", Router.route("sub-child"));

    r.at("child");

    // @ts-expect-error
    r.at("invalid-child");

    r.at("child").at("sub-child");

    // @ts-expect-error
    r.at("child").at("invalid-child");
}
