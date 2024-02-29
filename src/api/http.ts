import express from "express";
import { Express } from "express";
import { ServerAdapter, defaultServerAdapterCallback } from "./adapter";
import { ServerAdapterCallback, ServerConfig } from "../common/types";
/**
 * @description Api接口Http实现类
 */
export class HttpAdapter implements ServerAdapter {
    private app: Express;
    public CurrentConfig: ServerConfig;
    private DataCallBack: ServerAdapterCallback = defaultServerAdapterCallback;
    constructor(Config: ServerConfig) {
        this.CurrentConfig = Config;
        this.app = express();
        this.app.use(express.json());
        this.app.listen(this.CurrentConfig.Port, async () => {
            console.log(`App is running at http://localhost:${this.CurrentConfig.Port}`)
        })
    }
    setCallBack(Callback: ServerAdapterCallback) {
        this.DataCallBack = Callback;
    }
    onListening() {
        this.DataCallBack("boot", "ok!");
    }
    setConfig() {

    }
    getConfig() {

    }
}