import { OpenDialogOptions, dialog } from "electron"


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
        return originshowOpenDialog(options);
    }
}
