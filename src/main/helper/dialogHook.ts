import { OpenDialogOptions, dialog } from "electron"
import { CoreLog, LogLevel } from "./log";

type showOpenDialogCallBack = (options: OpenDialogOptions) => Promise<Electron.OpenDialogReturnValue> | Electron.OpenDialogReturnValue;
let showDialogCallBackFunc: showOpenDialogCallBack | undefined = undefined;
export const hasShowDialogHook = () => {
    if (showDialogCallBackFunc) {
        return false;
    } else {
        return true;
    }
}
export const setShowDialogHook = (callback: showOpenDialogCallBack) => {
    showDialogCallBackFunc = callback;
    return true;
}
export const removeShowDialogHook = () => {
    showDialogCallBackFunc = undefined;
    return true;
}
export const initDialogHook = () => {
    const originshowOpenDialog = dialog.showOpenDialog;
    (dialog.showOpenDialog as any) = async function (options: OpenDialogOptions) {
        if (showDialogCallBackFunc) {
            let ret = showDialogCallBackFunc(options);
            //CoreLog.getInstance().pushLog(LogLevel.Debug, "showOpenDialogHook", ret);
            if (ret instanceof Promise) {
                return ret;
            }
            return new Promise<Electron.OpenDialogReturnValue>((resolve, _reject) => {
                resolve(ret);
            })
        }
        return originshowOpenDialog(options);
    }
}
