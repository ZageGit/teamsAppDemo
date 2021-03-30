import { PreventIframe } from "express-msteams-host";

/**
 * Used as place holder for the decorators
 */
@PreventIframe("/demoTab/index.html")
@PreventIframe("/demoTab/config.html")
@PreventIframe("/demoTab/remove.html")
export class DemoTab {
}
