
var log4js = require('log4js');
var path = require('path')

log4js.configure({
    appenders: {
        mycat: {
            type: path.resolve("dist/index.js"),
            webhook_url: "https://hooks.slack.com/services/xxx/xxx", // gitignore
            converter: (ctx) => {
                return {
                    text: ctx.formatString()
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

