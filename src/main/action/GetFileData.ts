import { BaseAction } from "./BaseAction";
import { ActionName } from "./types";

export interface GetFileDataResponse {
    action: string;
}

export class GetFileData extends BaseAction<void, GetFileDataResponse> {
    public actionName: string = ActionName.GetFileData;
    public async _handle(_payload: void): Promise<GetFileDataResponse> {
        return { action: "GetFileData" };
    }
}
