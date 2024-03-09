import { BaseAction } from "./BaseAction";
import { ActionName } from "./types";

export interface WriteFileResponse {
    action: string;
}

export class WriteFile extends BaseAction<void, WriteFileResponse> {
    public actionName: string = ActionName.WriteFile;
    public async _handle(_payload: void): Promise<WriteFileResponse> {
        return { action: "WriteFile" };
    }
}
