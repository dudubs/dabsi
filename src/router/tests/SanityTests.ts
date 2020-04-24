import {Route, Router, RouterLocation} from "..";
import {getNextPath} from "../getNextPath";


const hello = "world";
const TestRouter = Router
    .extend({hello})
    .route("child", Router.route("sub-child"));


it('expect to self-extend', () => {
    expect(TestRouter.hello).toEqual(hello);
});

it('expect to child-extend', () => {
    expect(TestRouter.at("child").hello).toEqual(hello);
})

it('expect to sub-child-extend', () => {
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
        .route("child", Router.route("sub-child"))
        .extend({after})
        .extendLocation({afterLocation: after})
        .extendRoute({afterRoute: after});


    it('router', () => {
        expect(router.after).toEqual(after);
        expect(router.before).toEqual(before);
    });

    const location = RouterLocation(router);

    it('location', () => {
        expect(location.afterLocation).toEqual(after);
        expect(location.beforeLocation).toEqual(before);
    })

    const childRouter = router.at("child");
    it('child', () => {
        expect(childRouter.after).toEqual(after);
        expect(childRouter.before).toEqual(before);
    })

    const route = Route(router);
    it('route', () => {
        expect(route.afterRoute).toEqual(after);
        expect(route.beforeRoute).toEqual(before);
    });

    const childLocation = location.at("child");
    it('childLocation', () => {
        expect(childLocation.afterLocation).toEqual(after);
        expect(childLocation.beforeLocation).toEqual(before);
    });

    const childRoute = route.at("child");
    it('childRoute', () => {
        expect(childRoute.afterRoute).toEqual(after);
        expect(childRoute.beforeRoute).toEqual(before);
    });

    const subChildRouter = childRouter.at("sub-child");
    it('subChildRouter', () => {
        expect(subChildRouter.after).toEqual(after);
        expect(subChildRouter.before).toEqual(before);
    })

    const subChildLocation = childLocation.at("sub-child");
    it('subChildLocation', () => {
        expect(subChildLocation.afterLocation).toEqual(after);
        expect(subChildLocation.beforeLocation).toEqual(before);
    });

    const subChildRoute = childRoute.at("sub-child");
    it('childRoute', () => {
        expect(subChildRoute.afterRoute).toEqual(after);
        expect(subChildRoute.beforeRoute).toEqual(before);
    });

});

