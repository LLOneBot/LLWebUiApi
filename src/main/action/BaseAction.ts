import { ResponseReturn } from "./types";
import { JsonResponse } from "../server/JsonResponse";
import { DataClass } from "../helper/data";
import { WebState, WebStateCode } from "../../common/types";
export class BaseAction<PayloadType, ReturnDataType> {
    public actionName: string = "";
    protected async check(_payload: PayloadType): Promise<boolean> {
        // 大部分Api 登录后使用 不登陆 就没必要
        if ((DataClass.getInstance().get("WebUiApiState") as WebState).WorkState == WebStateCode.WAIT_LOGIN) {
            return false;
        }
        return true;
    }
    public async handle(payload: PayloadType): Promise<ResponseReturn<ReturnDataType | null>> {
        let resData: ReturnDataType;
        const result = await this.check(payload);
        if (!result) {
            return JsonResponse.error("This RequenstNot Pass Check");
        }
        try {
            resData = await this._handle(payload);
        } catch (e: any) {
            return JsonResponse.error(e.toString());
        }
        return JsonResponse.ok<ReturnDataType>(resData);
    }
    protected async _handle(_payload: PayloadType): Promise<ReturnDataType> {
        throw `pleas override ${this.actionName} _handle`;
    }
}
