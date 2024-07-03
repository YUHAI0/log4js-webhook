
var log4js = require('log4js');
var path = require('path')
log4js.configure({
    appenders: {
        mycat: {
            type: path.resolve("dist/index.js"),
            webhook_url: "https://discord.com/api/webhooks/1257983191491412028/_4v4C82TeaONMtmPaHl33C4MZeEN17TT11y_UNBVnCRQyOOPPu3869ZXk5ZRa6AGxZl-",
            converter: (loggingEvent, ctx) => {
                return {
                    content: ctx.format({
                        level: loggingEvent.level.levelStr,
                        message: `${loggingEvent.data[0]}`,
                        timestamp: loggingEvent.startTime.toLocaleString(),
                    })
                };
            }
        },
    },
    categories: { default: { appenders: ['mycat'], level: "debug" } },
});

const logger = log4js.getLogger('test');

logger.info("1")
logger.info("2")
logger.info("3")

