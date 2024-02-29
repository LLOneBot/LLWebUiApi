import { ServerAdapterCallback, ServerConfig } from "../common/types";
export function defaultServerAdapterCallback(_ActionName: string, _ArgData: string): boolean {
    return true;
}

/**
 * @description 外部Api接口抽象类
 */
export abstract class ServerAdapter {
    public CurrentConfig: ServerConfig | undefined = undefined;
    /**
     * @description 初始化配置
     */
    constructor() {
    }
    /**
     * @description 注册数据处理回调函数
     */
    setCallBack(_Callback: ServerAdapterCallback) {
    }
    /**
     * @description 启动服务器
     */
    onListening() {
    }
    /**
     * @description 重新设定配置属性
     */
    setConfig() {

    }
    /**
 * @description 获取配置属性
 */
    getConfig() {

    }
}