import { IpcApiCall } from "../helper/ipcHook";
import { BaseAction } from "./BaseAction";
import { ActionName, PluginIpcType } from "./types";
export interface PluginIPCResponse {
    message: string;
}

export interface PluginIPCPayload {
    type: PluginIpcType,
    channel: string,
    args: any
}

export class PluginIPC extends BaseAction<PluginIPCPayload, PluginIPCResponse> {
    public actionName: string = ActionName.PluginIPC;
    public async _handle(payload: PluginIPCPayload): Promise<PluginIPCResponse> {
        if (payload.type == PluginIpcType.Listen) {
            // 注册监听
        }
        if (payload.type == PluginIpcType.Send) {
            // 单向IPC
            IpcApiCall(payload.channel, payload.args);
        }
        if (payload.type == PluginIpcType.Invoke) {
            // 双向IPC
        }
        return { message: "PluginIPC Ok!" };

    }
}