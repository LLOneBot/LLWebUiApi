import { ServerConfig } from "../common/types";
import { ServerAdapter } from "./adapter";
import { HttpAdapter } from "./http";

/**
 * @description 工厂类 生成对应Api接口提供类
 */
export class ServerFactory {
    static getServer(AdapterName: string, Config: ServerConfig): ServerAdapter {
        if (AdapterName === "HTTP") {
            //
        }
        else if (AdapterName === "WS") {
            //
        } else if (AdapterName === "SOCK") {
            //
        }
        return new HttpAdapter(Config);
    }
}