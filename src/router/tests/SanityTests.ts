import {Router, RouterLocation} from "..";
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


it('extend, extendLocation: after & before', () => {

    const before = "before";
    const after = "after";

    const router = Router
        .extend({before})
        .extendLocation({beforeLocation: before})
        .route("child", Router.route("sub-child"))
        .extend({after})
        .extendLocation({afterLocation: after});

    expect(router.after).toEqual(after);
    expect(router.before).toEqual(before);

    const location = RouterLocation(router)
    expect(location.afterLocation).toEqual(after);
    expect(location.beforeLocation).toEqual(before);

    const childRouter = router.at("child");
    expect(childRouter.after).toEqual(after);
    expect(childRouter.before).toEqual(before);

    const childLocation = location.at("child");
    expect(childLocation.afterLocation).toEqual(after);
    expect(childLocation.beforeLocation).toEqual(before);

    const subChildRouter = childRouter.at("sub-child");
    expect(subChildRouter.after).toEqual(after);
    expect(subChildRouter.before).toEqual(before);

    const subChildLocation = childLocation.at("sub-child");
    expect(subChildLocation.afterLocation).toEqual(after);
    expect(subChildLocation.beforeLocation).toEqual(before);
});

