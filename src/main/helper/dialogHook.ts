import { dialog } from "electron"

export const initDialogHook = () => {
    const originshowOpenDialog = dialog.showOpenDialog;
    (dialog.showOpenDialog as any) = async function (...args: any[]) {
        console.log("showOpenDialog", args);
        return originshowOpenDialog(...args);
    }
}
