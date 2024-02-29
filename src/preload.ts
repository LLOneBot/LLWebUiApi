import { contextBridge, ipcRenderer } from "electron";
import {
    CHANNE_CORE_LOG
} from "./common/channels";

const LLWebUiApi = {
    pushLog: (data: any) => {
        ipcRenderer.send(CHANNE_CORE_LOG, data);
    }
}
console.log("WebUiApi Preload...");
export type LLWebUiApiType = typeof LLWebUiApi;

// 在window对象下导出只读对象
contextBridge.exposeInMainWorld("LLWebUiApi", LLWebUiApi);