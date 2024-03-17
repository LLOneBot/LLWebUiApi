import { BrowserWindow, ipcMain } from "electron";
import { CoreLog, LogLevel } from "./log";
type IpcRendererCallBack = (channel: string, args: any[]) => void;
let proxyIpcInvokeList: any[] = [];
let IpcRendererListener: Map<string, Array<IpcRendererCallBack>> = new Map();
export function addIpcRendererListener(channel: string, callback: IpcRendererCallBack) {
    if (IpcRendererListener.has(channel)) {
        for (let key of IpcRendererListener.get(channel) as Array<IpcRendererCallBack>) {
            if (key == callback) {
                return false;
            }
        }
        IpcRendererListener.set(channel, [callback, ...(IpcRendererListener.get(channel) as Array<IpcRendererCallBack>)]);
    }
    IpcRendererListener.set(channel, [callback]);
    return true;
}
export function removeIpcRendererListener(channel: string, callback: IpcRendererCallBack) {
    let newListener = [];
    if (IpcRendererListener.has(channel)) {
        for (let key of IpcRendererListener.get(channel) as Array<IpcRendererCallBack>) {
            if (key == callback) {
            } else {
                newListener.push(key);
            }
        }
        IpcRendererListener.set(channel, newListener);
    }
    // 没有Listener
    return false;
}
export function HookIpcReceiveHandle(window: BrowserWindow) {
    const originalSend = window.webContents.send;
    const patchSend = (channel: string, ...args: any) => {
        // HOOK IPC Receive
        if (IpcRendererListener.has(channel)) {
            for (let key of IpcRendererListener.get(channel) as Array<IpcRendererCallBack>) {
                key(channel, args);
            }
        }
        if (channel.indexOf("IPC_") != -1) {
        } else {
            // console.log(args);
        }
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
            let ret = target.apply(thisArg, args);
            if ((args as Array<any>).length > 2) {
                if (args[2].indexOf("IPC_UP") != -1) {

                } else {
                    console.log(args);
                    //console.log("IPC_Call", args);
                }
            } else {

            }
            return ret;
        },
    });
    const ipc_invoke_proxy = webContents._events["-ipc-invoke"]?.[0] || webContents._events["-ipc-invoke"];
    const proxyIpcInvoke = new Proxy(ipc_invoke_proxy, {
        apply(target, thisArg, args) {
            console.log(args);
            args[0]["_replyChannel"]["sendReply"] = new Proxy(args[0]["_replyChannel"]["sendReply"], {
                apply(sendtarget, sendthisArg, sendargs) {

                    sendtarget.apply(sendthisArg, sendargs);
                }
            });
            let ret = target.apply(thisArg, args);
            return ret;
        }
    });
    if (webContents._events["-ipc-message"]?.[0]) {
        webContents._events["-ipc-message"][0] = proxyIpcMsg;
    } else {
        webContents._events["-ipc-message"] = proxyIpcMsg;
    }

    if (webContents._events["-ipc-invoke"]?.[0]) {
        webContents._events["-ipc-invoke"][0] = proxyIpcInvoke;
        proxyIpcInvokeList.push(webContents._events["-ipc-invoke"][0]);
    } else {
        webContents._events["-ipc-invoke"] = proxyIpcInvoke;
        proxyIpcInvokeList.push(webContents._events["-ipc-invoke"]);
    }
}
export function IpcApiSend(channel: string, args: any): boolean {
    return ipcMain.emit(
        channel,
        {},
        ...args
    );
}
export async function IpcApiInvoke(
    channel: string,
    args: any[],
    callback?: (payload: any) => (void | Promise<void>),
    errorCallback?: (error: string) => void
) {
    console.log("reg hook");
    if (proxyIpcInvokeList.length == 0) {
        CoreLog.getInstance().pushLog(LogLevel.Error, "还未启动进行Invoke调用");
        return;
    }
    return proxyIpcInvokeList[0](
        {
            _replyChannel: {
                sendReply: ({ result, error }: { result: any, error: string }) => {
                    if (error && errorCallback) {
                        return errorCallback(error);
                    }
                    if (callback) {
                        new Promise(async (res) => {
                            res((await callback(result)));
                        }).then().catch(e => console.error(e));
                    }
                }
            },
            frameId: 1,
            processId: 1
        },
        false,
        channel,
        [...args]
    );
}