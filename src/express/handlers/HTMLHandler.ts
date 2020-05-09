import {Handler} from "express";
import {ContentHandler} from "./ContentHandler";

export function HTMLHandler({
                                body = "", head = "", title = "",
                                scripts = Array<string>(),
                                styleSheets = Array<string>()
                            }): Handler {
    return ContentHandler('text/html', `<!DOCTYPE html><html><head>${head}
${title && `<title>${title}</title>`}
<meta charset="UTF-8">
${styleSheets.map(href => `<link href="${href}" rel="stylesheet">`).join("")}
${scripts.map(src => `<script src="${src}"></script>`).join("")}
<body>${body}</body>
</head></html>`);
}
