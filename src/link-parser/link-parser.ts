import {Link} from "../models/link.model";

const ogs = require('open-graph-scraper');

export function parse(url: string) {
    return ogs({'url': url})
        .then((result: any) => {
            return new Link(result.data.ogUrl, result.data.ogTitle, result.data.ogDescription, result.data.ogImage.url);
        })
        .catch((error: any) => error);
}