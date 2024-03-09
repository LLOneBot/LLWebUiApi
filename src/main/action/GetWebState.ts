import { WebState } from "../../common/types";
import { DataClass } from "../helper/data";
import { BaseAction } from "./BaseAction";
import { ActionName } from "./types";


export class GetWebState extends BaseAction<null, WebState> {
    public actionName: string = ActionName.GetWebState;
    public async _handle(_payload: null): Promise<WebState>  {
        return DataClass.getInstance().get("WebUiApiState");
    }
}
