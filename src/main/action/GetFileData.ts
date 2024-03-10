import { BaseAction } from "./BaseAction";
import { ActionName } from "./types";
import fs from "fs";
export interface GetFileDataResponse {
    type: FileType,
    content: string
}
enum FileType { Text, Base64, Hex };
export interface GetFileDataPayload {
    path: string,
    type?: FileType
}
export class GetFileData extends BaseAction<GetFileDataPayload, GetFileDataResponse> {
    public actionName: string = ActionName.GetFileData;
    public async _handle(payload: GetFileDataPayload): Promise<GetFileDataResponse> {
        if (!payload.type) {
            payload.type = FileType.Text;
        }
        if (payload.type == FileType.Text) {
            return { type: payload.type, content: fs.readFileSync(payload.path).toString() }
        }
        // 除了TEXT其它还未实现
        return { type: payload.type, content: fs.readFileSync(payload.path).toString() }
    }
}
