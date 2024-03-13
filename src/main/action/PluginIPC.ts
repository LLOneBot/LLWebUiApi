import { IPCExecuteCall, IpcApiCall } from "../helper/ipcHook";
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
            if (IpcApiCall(payload.channel, payload.args)) {
                return { message: "PluginIPC Ok!" };
            } else {
                throw new Error("IPC Send Error");
            }
        }
        if (payload.type == PluginIpcType.Invoke) {
            // 双向IPC
            IPCExecuteCall(payload.channel, payload.args);
        }
        return { message: "PluginIPC Ok!" };

    }
}