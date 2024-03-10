import { BaseAction } from "./BaseAction";
import { GetAllPath } from "./GetAllPath";
import { GetBotLoginQR } from "./GetBotLoginQR";
import { GetWebState } from "./GetWebState";

export const actionHandlers = [
    new GetWebState(),
    new GetBotLoginQR(),
    new GetAllPath()
];

function initActionMap() {
    const actionMap = new Map<string, BaseAction<any, any>>();
    for (const action of actionHandlers) {
        actionMap.set(action.actionName, action);
    }

    return actionMap
}

export const actionMap = initActionMap();