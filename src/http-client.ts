import axios from 'axios';
import { WebhookConfig } from '.';

export default class HttpClient {
    config: WebhookConfig;
    
    constructor(config: WebhookConfig) {
        this.config = config;
    }

    send(msg: Object) {
        var httprequest:Promise<any>;
        if (this.config.method && this.config.method == 'get') {
            throw new Error('not support now')
        } else  {
            httprequest = axios({
                method: 'post',
                url: this.config.webhook_url,
                data: msg
            })
        }
        
        httprequest.then(res => {
        }).catch(err=> {
            console.log('error: ' + JSON.stringify(err))
        })
    }
}
