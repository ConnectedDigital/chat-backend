const ogs = require('open-graph-scraper');
import {Link} from "../models/link.model";

export function parse(url: string): Promise<Link> {
    return ogs({'url': url})
        .then((result: any) => {
            return new Link(result.data.ogUrl, result.data.ogTitle, result.data.ogDescription, result.data.ogImage.url);
        })
        .catch((error: any) => error);
}