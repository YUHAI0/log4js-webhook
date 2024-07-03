# LOG4JS KAFKA 
The only webhook appenders for log4js

## Install

```bash
npm install --save log4js-webhook
```

## Usage

```javascript
var log4js = require('log4js');
log4js.configure({
    appenders: {
        mycat: {
            type: "log4js-webhook",
            webhook_url: "http://webhook",
            converter: (loggingEvent, ctx) => {
                return {
                    content: ctx.format({
                        level: loggingEvent.level.levelStr,
                        message: `${loggingEvent.data[0]}`,
                        timestamp: loggingEvent.startTime.toLocaleString(),
                    })
                };
            }
        }
    },
    categories: { default: { appenders: ["mycat"], level: "debug" } },
});

const logger = log4js.getLogger('test');
logger.info("hello log4js-webhook");
```

## config

* webhook_url: the webhook url to send, no default, must config one.
* converter: custom logging event converter for customizing your data

--------------------------------------

Developed by me.yuhai@gmail.com