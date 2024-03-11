import { BaseAction } from "./BaseAction";
import { DeleteFile } from "./DeleteFile";
import { GetAllPath } from "./GetAllPath";
import { GetBotLoginQR } from "./GetBotLoginQR";
import { GetFileData } from "./GetFileData";
import { GetFileList } from "./GetFileList";
import { GetWebState } from "./GetWebState";
import { RenameFile } from "./RenameFile";
import { WriteFile } from "./WriteFile";

export const actionHandlers = [
    new GetWebState(),
    new GetBotLoginQR(),
    new GetAllPath(),
    new GetFileList(),
    new GetFileData(),
    new DeleteFile(),
    new RenameFile(),
    new WriteFile()
];

function initActionMap() {
    const actionMap = new Map<string, BaseAction<any, any>>();
    for (const action of actionHandlers) {
        actionMap.set(action.actionName, action);
    }

    return actionMap
}

export const actionMap = initActionMap();