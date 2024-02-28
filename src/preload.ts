import { contextBridge, ipcRenderer } from "electron";
import {
    CHANNEL_CORE_GETCONFIG
} from "./common/channels";

const LLWebUiApi = {
    getConfig: async (): Promise<void> => {
        return ipcRenderer.invoke(CHANNEL_CORE_GETCONFIG);
    }
}
console.log("WebUiApi Preload...");
export type LLWebUiApiType = typeof LLWebUiApi;

// 在window对象下导出只读对象
contextBridge.exposeInMainWorld("LLWebUiApi", LLWebUiApi);