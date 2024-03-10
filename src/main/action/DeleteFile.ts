import { BaseAction } from "./BaseAction";
import { ActionName, FileType } from "./types";
import fs from "fs";
export interface DeleteFileResponse {
    message: string;
}

export interface DeleteFilePayload {
    type: FileType;
    path: string;
}

export class DeleteFile extends BaseAction<DeleteFilePayload, DeleteFileResponse> {
    public actionName: string = ActionName.DeleteFile;
    public async _handle(payload: DeleteFilePayload): Promise<DeleteFileResponse> {
        if (payload.type == FileType.FILE || fs.existsSync(payload.path)) {
            fs.unlinkSync(payload.path);
        }
        else if (payload.type == FileType.PATH || fs.existsSync(payload.path)) {
            fs.rmdirSync(payload.path);
        }
        // 再次检查是否成功
        if (fs.existsSync(payload.path)) {
            throw new Error("Deleted File Fail");
        }
        return { message: "DeleteFile Ok!" };
    }
}
