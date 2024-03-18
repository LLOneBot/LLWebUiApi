import { OpenDialogOptions, dialog } from "electron"

export const initDialogHook = () => {
    const originshowOpenDialog = dialog.showOpenDialog;
    (dialog.showOpenDialog as any) = async function (options: OpenDialogOptions) {
        console.log("showOpenDialog", options);
        return originshowOpenDialog(options);
    }
}
