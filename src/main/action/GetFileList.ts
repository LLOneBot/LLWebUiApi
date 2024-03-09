import { FileStateApi } from "../../common/types";
import { FileSystemApi } from "../api/FileSystemApi";
import { BaseAction } from "./BaseAction";
import { ActionName } from "./types";

export interface GetFileListPayload {
    path: string;
}
export class GetFileList extends BaseAction<GetFileListPayload, FileStateApi[]> {
    public actionName: string = ActionName.GetFileList;
    public async _handle(payload: GetFileListPayload): Promise<FileStateApi[]> {
        return FileSystemApi.listFile(payload.path);
    }
}
