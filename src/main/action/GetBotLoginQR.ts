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
        // 需要判断情况 服务器状态与登录态
        return { base64Image: base64Image };
    }
}
