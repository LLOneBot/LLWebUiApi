import { BaseAction } from "./BaseAction";
import { ActionName, FileDataType } from "./types";
import fs from "fs";

export interface WriteFileResponse {
    message: string
}
export interface WriteFilePayload {
    path: string,
    content: string,
    type?: FileDataType
}
export class WriteFile extends BaseAction<WriteFilePayload, WriteFileResponse> {
    public actionName: string = ActionName.WriteFile;
    public async _handle(payload: WriteFilePayload): Promise<WriteFileResponse> {
        if (!payload.type) {
            payload.type = FileDataType.Text;
        }
        if (payload.type == FileDataType.Text) {
            // 应该是覆盖写入
            fs.writeFileSync(payload.path, payload.content);
            return { message: "Success" }
        }
        // 除了TEXT其它还未实现
        return { message: "Success" }
    }
}
