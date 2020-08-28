import {Router} from "../Router";
import objectContaining = jasmine.objectContaining;

testm(__filename, () => {


    it('expect to parameter', () => {
        expect(Router(["x"])).toEqual(objectContaining({
            params: ['x'],
            children: {}
        }));
    });

    it('expect to parameter and child', () => {
        expect(Router(["x"], {x: Router()})).toEqual(objectContaining({
            params: ['x'],
            children: {x: jasmine.any(Router)}
        }));
    });

   it('expect to child', () => {
        expect(Router({x: Router()})).toEqual(objectContaining({
            params: [],
            children: {x: jasmine.any(Router)}
        }));
    });

    it('expect to extend router type', () => {
        const r = Router({
            a: Router({
                aa: Router()
            }).extend({ax: "axt"})
        })
            .extend({x: "xt"})
            .route({
                b: Router()
                    .extend({bx: "bxt"})
            });

        expect(r.x).toEqual("xt")
        expect(r.at("a").x).toEqual("xt")
        expect(r.at("a").ax).toEqual("axt")
        expect(r.at("a").at("aa").x).toEqual("xt")
        expect(r.at("a").at("aa").ax).toEqual("axt")

    });

})
