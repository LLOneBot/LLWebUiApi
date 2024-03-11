import { BaseAction } from "./BaseAction";
import { ActionName, FileDataType } from "./types";
import fs from "fs";
export interface GetFileDataResponse {
    type: FileDataType,
    content: string
}
export interface GetFileDataPayload {
    path: string,
    type?: FileDataType
}
export class GetFileData extends BaseAction<GetFileDataPayload, GetFileDataResponse> {
    public actionName: string = ActionName.GetFileData;
    public async _handle(payload: GetFileDataPayload): Promise<GetFileDataResponse> {
        if (!payload.type) {
            payload.type = FileDataType.Text;
        }
        if (payload.type == FileDataType.Text) {
            return { type: payload.type, content: fs.readFileSync(payload.path).toString() }
        }
        // 除了TEXT其它还未实现
        return { type: payload.type, content: fs.readFileSync(payload.path).toString() }
    }
}
