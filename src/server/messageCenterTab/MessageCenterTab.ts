import { PreventIframe } from "express-msteams-host";

/**
 * Used as place holder for the decorators
 */
@PreventIframe("/messageCenterTab/index.html")
@PreventIframe("/messageCenterTab/config.html")
@PreventIframe("/messageCenterTab/remove.html")
export class MessageCenterTab {
}
