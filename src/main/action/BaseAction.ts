import { ResponseReturn } from "./types";
import { JsonResponse } from "../server/JsonResponse";
export class BaseAction<PayloadType, ReturnDataType> {
    public actionName: string = "";
    public async handle(payload: PayloadType): Promise<ResponseReturn<ReturnDataType | null>> {
        const resData = await this._handle(payload);
        return JsonResponse.ok<ReturnDataType>(resData);
    }
    protected async _handle(_payload: PayloadType): Promise<ReturnDataType> {
        throw `pleas override ${this.actionName} _handle`;
    }
}
