import { WebState, WebStateCode } from "../../common/types";
import { DataClass } from "../helper/data";
import { BaseAction } from "./BaseAction";
import { ActionName } from "./types";

export interface WebStateResponse {
    base64Image: string;
}

export class GetBotLoginQR extends BaseAction<void, WebStateResponse> {
    public actionName: string = ActionName.GetBotLoginQR;
    public async _handle(_payload: void): Promise<WebStateResponse> {
        const base64Image = DataClass.getInstance().get("QRCODE_BASE64");
        if ((DataClass.getInstance().get("WebUiApiState") as WebState).WorkState != WebStateCode.WAIT_LOGIN || base64Image === "") {
            throw new Error('Is Running Or Error !');
        }
        return { base64Image: base64Image };
    }
}
