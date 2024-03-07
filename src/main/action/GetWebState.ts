import { BaseAction } from "./BaseAction";
import { ActionName } from "./type";


export class GetWebState extends BaseAction<null, any> {
    public actionName: string = ActionName.GetWebState;
    public async _handle(_payload: null): Promise<any>  {

    }
}
