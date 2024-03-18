import { OpenDialogOptions, dialog } from "electron"


type showOpenDialogCallBack = (options: OpenDialogOptions) => Promise<Electron.OpenDialogReturnValue> | Electron.OpenDialogReturnValue;
export const initDialogHook = () => {
    const originshowOpenDialog = dialog.showOpenDialog;
    (dialog.showOpenDialog as any) = async function (options: OpenDialogOptions) {
        console.log("showOpenDialog", options);
        // Hook 未实现仅实现监测
        return originshowOpenDialog(options);
    }
}
