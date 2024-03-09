import { BaseAction } from "./BaseAction";
import { ActionName } from "./types";

export interface GetBasicInfoResponse {
    action: string;
}

export class GetBasicInfo extends BaseAction<void, GetBasicInfoResponse> {
    public actionName: string = ActionName.GetBasicInfo;
    public async _handle(_payload: void): Promise<GetBasicInfoResponse> {
        return { action: "GetBasicInfo" };
    }
}
