import { ResponseReturn } from "./types";
import { JsonResponse } from "../server/JsonResponse";
export class BaseAction<PayloadType, ReturnDataType> {
    public actionName: string = "";
    protected async check(_payload: PayloadType): Promise<boolean> {
        /**
        if ((DataClass.getInstance().get("WebUiApiState") as WebState).WorkState == WebStateCode.WAIT_LOGIN) {
            return false;
        }
         */
        return true;
    }
    public async handle(payload: PayloadType): Promise<ResponseReturn<ReturnDataType | void>> {
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
