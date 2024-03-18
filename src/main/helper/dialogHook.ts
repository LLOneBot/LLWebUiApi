import { OpenDialogOptions, dialog } from "electron"

type showOpenDialogCallBack = (options: OpenDialogOptions) => Promise<Electron.OpenDialogReturnValue> | Electron.OpenDialogReturnValue;
let showDialogList: showOpenDialogCallBack[] = [];
export const addShowDialogHook = (callback: showOpenDialogCallBack) => {
    for (let showDialogCallFunc of showDialogList) {
        if (showDialogCallFunc === callback) {
            return false;
        }
    }
    showDialogList.push(callback);
    return true;
}
export const removeShowDialogHook = (callback: showOpenDialogCallBack) => {
    let newShowDialogList: showOpenDialogCallBack[] = [];
    for (let showDialogCallFunc of showDialogList) {
        if (showDialogCallFunc === callback) {
            return false;
        } else {
            newShowDialogList.push(showDialogCallFunc);
        }
    }
    newShowDialogList == showDialogList
    return true;
}
export const initDialogHook = () => {
    const originshowOpenDialog = dialog.showOpenDialog;
    (dialog.showOpenDialog as any) = async function (options: OpenDialogOptions) {
        if (showDialogList.length > 0) {
            let ret = showDialogList[showDialogList.length - 1](options);
            console.log("showOpenDialogHook", ret);
            if (ret instanceof Promise) {
                //showDialogList.pop();
                return ret;
            }
            showDialogList.pop();
            return new Promise<Electron.OpenDialogReturnValue>((resolve, _reject) => {
                resolve(ret);
            })
        }
        return originshowOpenDialog(options);
    }
}
