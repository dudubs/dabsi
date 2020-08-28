// import {Router} from "../../../router";
// import {OldReactRouter} from "../OldReactRouter";
//
// function test() {
//
//     const r = Router
//         .param("xs")
//         .param("xi", Number)
//         .withContext(params => {
//             // @ts-expect-error
//             params.x;
//             assertType<string>(params.xs);
//             assertType<number>(params.xi);
//             return {
//                 cxs: "",
//                 cxi: 3
//             }
//         }, () => {
//             return {xs: "a", xi: 4}
//         });
//
//     // @ts-expect-error
//     r.params.x;
//
//     r.params.xi;
//
//     // @ts-expect-error
//     void(r.contextType.x);
//
//     // @ts-expect-error
//     void(r.contextType.xs);
//
//     void(r.contextType.cxs);
//
//     r
//         .renderIndex(props => {
//
//             // @ts-expect-error
//             props.route.context.x;
//
//             assertType<string>(props.route.context.cxs);
//
//             assertType<number>(props.route.context.cxi);
//
//             return undefined
//         });
//
// }
//
// declare function assertType<T>(value: T);
