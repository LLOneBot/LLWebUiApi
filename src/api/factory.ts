import { HttpAdapter } from "./http";

// 
export class ServerFactory {
    constructor(_AdapterName: string, ServerPort: number) {
        // 按照适配器名字加载Adapter
        // 创建Http服务 我还没实现
        return new HttpAdapter(ServerPort);
    }
}