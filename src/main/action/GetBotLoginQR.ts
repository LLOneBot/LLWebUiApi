import { WebState, WebStateCode } from "../../common/types";
import { DataClass } from "../helper/data";
import { BaseAction } from "./BaseAction";
import { ActionName } from "./types";

export interface WebStateResponse {
    base64Image: string;
}

export class GetBotLoginQR extends BaseAction<void, WebStateResponse> {
    public actionName: string = ActionName.GetBotLoginQR;
    protected async check(_payload: void): Promise<boolean> {
        let WorkState = (DataClass.getInstance().get("WebUiApiState") as WebState).WorkState;
        //工作状态与异常状态 不需要获取QRcode
        if (WorkState != WebStateCode.WAIT_LOGIN) {
            return false;
        }
        return true;
    }
    public async _handle(_payload: void): Promise<WebStateResponse> {
        const base64Image = DataClass.getInstance().get("QRCODE_BASE64");
        if (base64Image === "") {
            throw new Error('Is Running Or Error !');
        }
        return { base64Image: base64Image };
    }
}
