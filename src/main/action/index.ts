import { BaseAction } from "./BaseAction";
import { GetWebState } from "./GetWebState";

export const actionHandlers = [
    new GetWebState()
];

function initActionMap() {
    const actionMap = new Map<string, BaseAction<any, any>>();
    for (const action of actionHandlers) {
        actionMap.set(action.actionName, action);
    }

    return actionMap
}

export const actionMap = initActionMap();
export interface OB11Return<DataType> {
    status: string
    retcode: number
    data: DataType
    message: string,
    echo?: any, // ws调用api才有此字段
    wording?: string,  // go-cqhttp字段，错误信息
}