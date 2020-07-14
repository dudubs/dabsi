import {createRouterRoute, Router, createRouterLocation} from "..";
import {getNextPath} from "../utils/getNextPath";


const hello = "world";
const TestRouter = Router
    .extend({hello})
    .route("child", Router.route("sub-child"));


it('expected to self-extendRoute', () => {
    expect(TestRouter.hello).toEqual(hello);
});

it('expected to child-extendRoute', () => {
    expect(TestRouter.at("child").hello).toEqual(hello);
})

it('expected to sub-child-extendRoute', () => {
    expect(TestRouter.at("child").at("sub-child").hello).toEqual(hello);
});


it('getNextPath', () => {
    expect(getNextPath('/')).toEqual(['', '']);
    expect(getNextPath('/child')).toEqual(['child', '']);
    expect(getNextPath('child')).toEqual(['child', '']);
    expect(getNextPath('/child/sub-child')).toEqual(['child', '/sub-child']);
    expect(getNextPath('child/sub-child')).toEqual(['child', '/sub-child']);

});

describe('extending', () => {


    const before = "before";
    const after = "after";

    const router = Router
        .extend({before})
        .extendLocation({beforeLocation: before})
        .extendRoute({beforeRoute: before})
        .extendInstance()<{ beforeInstance }>()
        .route("child", Router.route("sub-child"))
        .extend({after})
        .extendLocation({afterLocation: after})
        .extendRoute({afterRoute: after})
        .extendInstance()<{ afterInstance }>();


    it('router', () => {
        expect(router.after).toEqual(after);
        expect(router.before).toEqual(before);
    });

    const instance = {beforeInstance: before, afterInstance: after};
    const location = createRouterLocation(router, {instance});


    it('location', () => assertLocation(location));

    const childRouter = router.at("child");
    it('child', () => assertRouter(childRouter));

    const route = createRouterRoute(router, {instance});
    it('route', () => assertRoute(route));

    const childLocation = location.at("child");
    it('childLocation', () => assertLocation(childLocation));

    const childRoute = route.at("child");
    it('childRoute', () => assertRoute(childRoute));

    const subChildRouter = childRouter.at("sub-child");
    it('subChildRouter', () => assertRouter(subChildRouter));

    const subChildLocation = childLocation.at("sub-child");
    it('subChildLocation', () => assertLocation(subChildLocation));

    const subChildRoute = childRoute.at("sub-child");
    it('childRoute', () => assertRoute(subChildRoute));

    function assertInstance(obj) {
        expect(obj).toEqual(jasmine.objectContaining(instance));
    }

    function assertLocation(obj) {
        assertInstance(obj);
        expect(obj).toEqual(jasmine.objectContaining({
            afterLocation: after,
            beforeLocation: before
        }));
    }

    function assertRoute(obj) {
        assertInstance(obj);
        expect(obj).toEqual(jasmine.objectContaining({
            afterRoute: after,
            beforeRoute: before
        }));
    }

    function assertRouter(obj) {
        expect(obj).toEqual(jasmine.objectContaining({after, before}));
    }

});
