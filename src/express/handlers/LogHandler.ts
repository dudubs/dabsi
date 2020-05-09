import {Handler} from "express";

export function LogHandler(): Handler {
    return (req, res, next) => {
        console.log(`${req.method} ${req.path} `);
        next();
    }
}

