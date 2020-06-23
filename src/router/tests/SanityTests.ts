import {Route, Router, RouterLocation} from "..";
import {getNextPath} from "../getNextPath";
import objectContaining = jasmine.objectContaining;


const hello = "world";
const TestRouter = Router
    .extend({hello})
    .route("child", Router.route("sub-child"));


it('tryUndefined to self-extend', () => {
    expect(TestRouter.hello).toEqual(hello);
});

it('tryUndefined to child-extend', () => {
    expect(TestRouter.at("child").hello).toEqual(hello);
})

it('tryUndefined to sub-child-extend', () => {
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
    const location = RouterLocation(router, {instance});


    it('location', () => assertLocation(location));

    const childRouter = router.at("child");
    it('child', () => assertRouter(childRouter));

    const route = Route(router, {instance});
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
        expect(obj).toEqual(objectContaining(instance));
    }

    function assertLocation(obj) {
        assertInstance(obj);
        expect(obj).toEqual(objectContaining({
            afterLocation: after,
            beforeLocation: before
        }));
    }

    function assertRoute(obj) {
        assertInstance(obj);
        expect(obj).toEqual(objectContaining({
            afterRoute: after,
            beforeRoute: before
        }));
    }

    function assertRouter(obj) {
        expect(obj).toEqual(objectContaining({after, before}));
    }

});
