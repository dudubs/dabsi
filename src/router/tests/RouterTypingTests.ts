import {AnyRouter, RouterLocation} from "..";
import {Route} from "../route";
import {Router} from "../Router";


function test() {
    const TestRouter = Router.extend({

        test<Router extends AnyRouter>(this: Router, callback: (props: {
            route: Route<Router>
            location: RouterLocation<Router>
        }) => void) {

        }

    });


    // routerExtendRoute
    {
        TestRouter
            .extendRoute({
                test<T extends AnyRouter>(this: Route<T>): void {

                }
            })
            .route("1", Router.route("1"))

            .at("1").at("1")
    }

    // context
    {
        const r = TestRouter
            .param("xs")
            .param("xi", Number)
            .withContext(params => {
                // @ts-expect-error
                params.x;
                assertType<string>(params.xs);
                assertType<number>(params.xi);
                return {cxs: "s", cxi: 0}
            }, () => {
                return {xs: "s", xi: 0}
            });

        // @ts-expect-error
        r.contextType.x;

        r.contextType.cxs;

        r.test(() => {

        })
    }
    // routers
    {

        const r = TestRouter
            .route("brother")
            .route("child", Router
                .route("sub-brother")
                .route("sub-child", Router
                    .route("extra-sub-child")
                    .route("extra-sub-brother")
                )
            );

        void (r.children.child.children["sub-child"].children["extra-sub-child"]);

        // @ts-expect-error
        void (r.children.child.children["sub-child"].children.x);

        // @ts-expect-error
        void (r.children.child.children.x);


        const child = r.at("child");
        child.test(props => {

            props.route.at("sub-child")

        });

        // @ts-expect-error
        r.at("invalid-child");

        const subChild = child.at("sub-child");


        subChild.test(props => {

            // @ts-expect-error
            props.route.at("sub-child");

            props.route.at("extra-sub-child");

            // @ts-expect-error
            props.route.at("sub-brother");

            props.route.at("extra-sub-brother");

            props.route.stack("sub-child");

            // @ts-expect-error
            props.route.stack("sub-brother");

        });

        // @ts-expect-error
        r.at("child").at("sub-child").at("invalid-child");

        const extraSubChild = r.at("child").at("sub-child").at("extra-sub-child");

        extraSubChild.test(props => {

            props.route.stack("sub-child");

            props.route.stack("extra-sub-child");

            // @ts-expect-error
            props.route.stack("sub-brother");


            // @ts-expect-error
            props.route.stack("extra-sub-brother");
        });

        // @ts-expect-error
        r.at("child").at("invalid-child");
    }

    /*

    r.create(instance props);

     */

}

declare function assertType<T>(value: T);
