import { WebUiApiConfig } from "../../common/types";
import { DATA_DIR } from "./utils";
import fs from 'fs';
import path from 'path';
export class CoreConfig {
    public configData: WebUiApiConfig;
    static CurrentInstance: CoreConfig;
    private configPath: string;
    constructor() {
        this.configPath = path.resolve(DATA_DIR, "config.json");
        if (!fs.existsSync(this.configPath)) {
            fs.writeFileSync(this.configPath, JSON.stringify(this.getDefaultConfig()))
        }
        this.configData = JSON.parse(fs.readFileSync(this.configPath, "utf8"));
    }
    static getInstance(): CoreConfig {
        if (!CoreConfig.CurrentInstance) {
            CoreConfig.CurrentInstance = new CoreConfig();
            return CoreConfig.CurrentInstance;
        }
        return CoreConfig.CurrentInstance;
    }
    public get(): WebUiApiConfig {
        return this.configData;
    }
    public setLost(newConfig: WebUiApiConfig) {
        // 运行结束丢失数据
        this.configData = newConfig;
    }
    public set(newConfig: WebUiApiConfig) {
        //this.configData = newConfig; 不要立刻刷新 而是主动监听callbck刷新
        fs.writeFileSync(this.configPath, JSON.stringify(newConfig));
    }
    public regListening() {
        // 注册监听配置操作
    }
    private getDefaultConfig(): WebUiApiConfig {
        return {
            Server: { Port: 6099, Password: Math.random().toString(36).slice(2) },
            AutoLogin: true,
            BootMode: 0,
            Debug: false
        };
    }
}