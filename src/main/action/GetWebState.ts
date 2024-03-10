import { WebState } from "../../common/types";
import { DataClass } from "../helper/data";
import { BaseAction } from "./BaseAction";
import { ActionName } from "./types";


export class GetWebState extends BaseAction<void, WebState> {
    public actionName: string = ActionName.GetWebState;
    public async _handle(_payload: void): Promise<WebState> {
        return DataClass.getInstance().get("WebUiApiState");
    }
}
