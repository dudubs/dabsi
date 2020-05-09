import {Handler} from "express";

export function ContentHandler(contentType: string, content: string): Handler {
    return (req, res) => {

        res
            .set("Content-Type", "text/html")
            .set("Content-Length", content.length.toString())
            .set("Expires", "0");

        res.status(200);
        res.send(content);

        res.end();
    }
}
