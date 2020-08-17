import {createMemoryHistory} from "history";
import {createElement} from "react";
import * as TestRenderer from "react-test-renderer";
import {Timeout} from "../../../common/async/Timeout";
import {createRouterRoute, Route, Router} from "../../../router";
import {routeByPath} from "../../../router/route/routeByPath";
import {elementContaining} from "../../tests/elementContaining";
import {provide} from "../../utils/provide";

import {AnyReactRouter, ReactRouter, ReactRouterRenderers} from "../ReactRouter";
import {ReactRouterContainer} from "../ReactRouterContainer";
import {ReactRouterContent} from "../ReactRouterContent";
import {ReactRouterLocation} from "../ReactRouterLocation";


testm(__filename, () => {
    async function testRoute(route: Route<AnyReactRouter>, path: string) {
        [path, route] = await routeByPath(route, path)
        return TestRenderer.create(
            provide(ReactRouterLocation,
                new ReactRouterLocation(route, path),
                createElement(ReactRouterContent)
            )
        ).toJSON()
    }


    let r = ReactRouter
        .route("child", Router.route("sub-child"));

    r.render(props => createElement("main", props));
    r.at("child").render(props => createElement("child", props));
    r.at("child").at("sub-child").render(props => createElement("sub-child", props));


    it('expected data different after cloneObject.', () => {
        expect(ReactRouterRenderers(r.extend({})).length).toEqual(0);
        expect(ReactRouterRenderers(r.extend({}).at("child")).length).toEqual(0);
        expect(ReactRouterRenderers(r).length).toBeGreaterThan(0);
        expect(ReactRouterRenderers(r.at("child")).length).toBeGreaterThan(0);
        expect(ReactRouterRenderers(r.at("child").at('sub-child')).length).toBeGreaterThan(0);
    });


    it('routeByPath', async () => {
        expect(await routeByPath(createRouterRoute(r), "/child/sub-child/invalid")).toEqual(
            jasmine.arrayContaining([
                "/invalid",
                jasmine.objectContaining({
                    name: "sub-child",
                    parent: jasmine.objectContaining({
                        name: "child"
                    })
                })
            ])
        );
    })

    it('expected route to child as index', async () => {
        expect(await testRoute(createRouterRoute(r), "/child")).toEqual(
            elementContaining("main", null,
                elementContaining("child", {
                    isIndex: true,
                    isDefault: false
                })
            )
        )
    });


    it('expected route to child as default', async () => {
        expect(await testRoute(createRouterRoute(r), "/child/invalid")).toEqual(
            elementContaining("main", null,
                elementContaining("child", {
                    isIndex: false,
                    isDefault: true,
                    path: "/invalid"
                })
            )
        )
    });

    it('ReactRouterContainer', async () => {

        const history = createMemoryHistory();

        const element = () => createElement(ReactRouterContainer, {
            router: r,
            history,
            context: null,
            children: createElement(ReactRouterContent)
        });

        const tester = TestRenderer.create(element());
        await Timeout(10);
        history.push("/child/sub-child/invalid");
        await Timeout(10);

        expect(tester.toJSON()).toEqual(
            elementContaining("main", null,
                elementContaining("child", null,
                    elementContaining("sub-child")
                )
            )
        );
    });

})
