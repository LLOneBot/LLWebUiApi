import { BaseAction } from "./BaseAction";
import { ActionName, FileType } from "./types";
import fs from "fs";
export interface DeleteFileResponse {
    message: string;
}

export interface DeleteFilePayload {
    Type: FileType;
    File: string;
}

export class DeleteFile extends BaseAction<DeleteFilePayload, DeleteFileResponse> {
    public actionName: string = ActionName.DeleteFile;
    public async _handle(payload: DeleteFilePayload): Promise<DeleteFileResponse> {
        if (payload.Type == FileType.FILE || fs.existsSync(payload.File)) {
            fs.unlinkSync(payload.File);
        }
        else if (payload.Type == FileType.PATH || fs.existsSync(payload.File)) {
            fs.rmdirSync(payload.File);
        }
        // 再次检查是否成功
        if (!fs.existsSync(payload.File)) {
            throw new Error("Deleted File Fail");
        }
        return { message: "DeleteFile Ok!" };
    }
}
