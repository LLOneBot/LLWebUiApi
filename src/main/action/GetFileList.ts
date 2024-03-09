import { BaseAction } from "./BaseAction";
import { ActionName } from "./types";

export interface GetFileListResponse {
    action: string;
}

export class GetFileList extends BaseAction<void, GetFileListResponse> {
    public actionName: string = ActionName.GetFileList;
    public async _handle(_payload: void): Promise<GetFileListResponse> {
        return { action: "GetFileList" };
    }
}
