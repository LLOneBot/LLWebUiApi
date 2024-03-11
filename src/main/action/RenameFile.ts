import { BaseAction } from "./BaseAction";
import { ActionName } from "./types";
import fs from "fs";
export interface RenameFileResponse {
    message: string;
}
export interface RenameFilePayload {
    oldPath: string;
    newPath: string;
}
export class RenameFile extends BaseAction<RenameFilePayload, RenameFileResponse> {
    public actionName: string = ActionName.RenameFile;
    public async _handle(payload: RenameFilePayload): Promise<RenameFileResponse> {
        fs.renameSync(payload.oldPath,payload.newPath);
        return { message: "Rename Success" };
    }
}
