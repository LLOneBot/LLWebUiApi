import { BaseAction } from "./BaseAction";
import { ActionName } from "./types";

export interface WebStateResponse {
    name: string;
}

export class GetBotLoginQR extends BaseAction<void, WebStateResponse> {
    public actionName: string = ActionName.GetBotLoginQR;
    public async _handle(_payload: void): Promise<WebStateResponse> {
        return { name: "GetBotLoginQR" };
    }
}
