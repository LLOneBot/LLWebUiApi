import { contextBridge, ipcRenderer } from "electron";
import {
    CHANNEL_GET_CONFIG
} from "./common/channels";

const LLWebUiApi = {
    getConfig: async (): Promise<void> => {
        return ipcRenderer.invoke(CHANNEL_GET_CONFIG);
    }
}
console.log("WebUiApi Preload...");
export type LLWebUiApiType = typeof LLWebUiApi;

// 在window对象下导出只读对象
contextBridge.exposeInMainWorld("LLWebUiApi", LLWebUiApi);