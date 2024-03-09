import { BaseAction } from "./BaseAction";
import { ActionName } from "./types";

export interface DeleteFileResponse {
    action: string;
}

export class DeleteFile extends BaseAction<void, DeleteFileResponse> {
    public actionName: string = ActionName.DeleteFile;
    public async _handle(_payload: void): Promise<DeleteFileResponse> {
        return { action: "DeleteFile" };
    }
}
