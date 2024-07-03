/**
 * Log4js webhook appender
 * 
 */
import HttpClient from './http-client';

export interface WebhookMsg {
    level: string,
    message: string,
    timestamp: any
}

export class WebhookContext {
    format: (msg: WebhookMsg) => string = function(msg) {
        var data = `${msg.timestamp} - [${msg.level}] ${msg.message}`
        return data;
    }
}

export class WebhookConfig {
    method?: string = 'post';
    webhook_url: string;
    converter: (loggingEvent: any, ctx: WebhookContext) => Object;
    constructor(webhook_url: string, converter: (loggingEvent: any) => Object) {
        this.webhook_url = webhook_url;
        this.converter = converter;
    }
}

function defaultLoggingEventConverter(loggingEvent: any, ctx: WebhookContext) {
    return ctx.format({
        level: loggingEvent.level.levelStr,
        message: loggingEvent.data[0],
        timestamp: loggingEvent.startTime});
}

function appender(config: WebhookConfig) {

    let converter = config.converter ? config.converter : defaultLoggingEventConverter;
    const client = new HttpClient(config);

    return (loggingEvent: any) => {
        client.send(converter(loggingEvent, new WebhookContext()));
    };
}

export function configure(config: WebhookConfig) {
    return appender(config);
}