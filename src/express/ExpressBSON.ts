import * as bodyParser from "body-parser";
import {Handler} from "express";
import {BSON2} from "../common/BSON2";

const raw = bodyParser.raw({
    type: "application/bson"
});

export function ExpressBSON(): Handler {
    return (req, res, next) => {
        if (req.headers['content-type'] === "application/bson") {
            res.json = (obj) => {
                return res.send(BSON2.pack(obj))
            };
            raw(req, res, () => {
                req.body = BSON2.unpack(req.body);
                next();
            });

        } else {
            next();
        }
    }
}
