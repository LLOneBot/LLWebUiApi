import { BaseAction } from "./BaseAction";
import { ActionName } from "./type";

export class GetBotLoginQR extends BaseAction<null, null> {
    public actionName: string = ActionName.GetBotLoginQR;
    public async _handle(_payload: null): Promise<any>  {

    }
}
