import { OpenDialogOptions, dialog } from "electron"

// Hook应该加入一个5min时间设置 及时清理
type showOpenDialogCallBack = (options: OpenDialogOptions) => Promise<Electron.OpenDialogReturnValue> | Electron.OpenDialogReturnValue;
let showDialogList: showOpenDialogCallBack[] = [];
export const addShowDialogHook = (callback: showOpenDialogCallBack) => {
    showDialogList.push(callback);
    return true;
}
export const initDialogHook = () => {
    const originshowOpenDialog = dialog.showOpenDialog;
    (dialog.showOpenDialog as any) = async function (options: OpenDialogOptions) {
        console.log("showOpenDialog", options);
        if (showDialogList.length > 0) {
            let ret = showDialogList[showDialogList.length](options);
            showDialogList.pop();
            return ret;
        }
        return originshowOpenDialog(options);
    }
}
