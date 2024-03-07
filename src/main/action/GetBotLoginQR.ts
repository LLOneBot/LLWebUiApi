import { BaseAction } from "./BaseAction";
import { ActionName } from "./types";

export class GetBotLoginQR extends BaseAction<null, any> {
    public actionName: string = ActionName.GetBotLoginQR;
    public async _handle(_payload: any): Promise<any>  {
        return "GetBotLoginQR";
    }
}
