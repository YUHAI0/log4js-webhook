/**
 * Log4js webhook appender
 * 
 */
import { LoggingEvent } from 'log4js';
import HttpClient from './http-client';
import dateFormat from 'dateformat';

export interface WebhookMsg {
    level: string,
    message: string,
    timestamp: string 
}

export class WebhookContext {
    loggingEvent: LoggingEvent;
    constructor(loggingEvent: LoggingEvent) {
        this.loggingEvent = loggingEvent;
    }
    format(msg: WebhookMsg) : string {
        var data = `${msg.timestamp} - [${msg.level}] ${msg.message}`
        return data;
    }
    formatString() {
        var e = this.loggingEvent;
        return this.format({level: e.level.levelStr,message:e.data[0],timestamp:dateFormat(e.startTime, 'isoDateTime')})
    }
}

export class WebhookConfig {
    method?: string = 'post';
    webhook_url: string;
    converter: (ctx: WebhookContext) => Object;
    constructor(webhook_url: string, converter: (ctx: WebhookContext) => Object) {
        this.webhook_url = webhook_url;
        this.converter = converter;
    }
}

function defaultLoggingEventConverter(ctx: WebhookContext) {
    return {data: ctx.formatString()};
}

function appender(config: WebhookConfig) {

    let converter = config.converter ? config.converter : defaultLoggingEventConverter;
    const client = new HttpClient(config);

    return (loggingEvent: any) => {
        client.send(converter(new WebhookContext(loggingEvent)));
    };
}

export function configure(config: WebhookConfig) {
    return appender(config);
}