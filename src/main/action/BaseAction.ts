import { ResponseReturn } from "./types";
import { ApiResponse } from "../server/ApiResponse";
export class BaseAction<PayloadType, ReturnDataType> {
    public actionName: string = "";
    public async handle(payload: PayloadType): Promise<ResponseReturn<ReturnDataType | null>> {
        const resData = await this._handle(payload);
        return ApiResponse.ok<ReturnDataType>(resData)
    }
    protected async _handle(_payload: PayloadType): Promise<ReturnDataType> {
        throw `pleas override ${this.actionName} _handle`;
    }
}
