import { BrowserWindow, ipcMain } from "electron";

let receiveHooks: Array<{
    channel: string,
    hookFunc: ((payload: any) => void | Promise<void>)
}> = []
export function IPCExecuteCall(){
    
}
export function HookIpcReceiveHandle(window: BrowserWindow) {
    const originalSend = window.webContents.send;
    const patchSend = (channel: string, ...args: any) => {
        // HOOK IPC Receive
        originalSend.call(window.webContents, channel, ...args);
    }
    window.webContents.send = patchSend;
}
export function HookIpcCallHandle(window: BrowserWindow) {
    // HOOK IPC Call
    let webContents = window.webContents as any;
    const ipc_message_proxy = webContents._events["-ipc-message"]?.[0] || webContents._events["-ipc-message"];

    const proxyIpcMsg = new Proxy(ipc_message_proxy, {
        apply(target, thisArg, args) {
            return target.apply(thisArg, args);
        },
    });
    if (webContents._events["-ipc-message"]?.[0]) {
        webContents._events["-ipc-message"][0] = proxyIpcMsg;
    } else {
        webContents._events["-ipc-message"] = proxyIpcMsg;
    }
}
export function IpcApiCall(channel: string, args: any): boolean {
    return ipcMain.emit(
        channel,
        {},
        ...args
    );
}