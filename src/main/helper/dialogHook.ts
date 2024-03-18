import { dialog } from "electron"

export const initDialogHook = () => {
    const originshowOpenDialog = dialog.showOpenDialog;
    (dialog.showOpenDialog as any) = async function (browserWindow: Electron.BrowserWindow, options: Electron.OpenDialogOptions) {
        return originshowOpenDialog(browserWindow, options);
    }
}
