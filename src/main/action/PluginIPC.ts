import { BaseAction } from "./BaseAction";
import { ActionName, PluginIpcType } from "./types";
export interface PluginIPCResponse {
    message: string;
}

export interface PluginIPCPayload {
    type: PluginIpcType,
    content: any
}

export class PluginIPC extends BaseAction<PluginIPCPayload, PluginIPCResponse> {
    public actionName: string = ActionName.PluginIPC;
    public async _handle(_payload: PluginIPCPayload): Promise<PluginIPCResponse> {

        return { message: "PluginIPC Ok!" };
    }
}
