import { BaseAction } from "./BaseAction";
import { ActionName } from "./types";

export interface RenameFileResponse {
    action: string;
}

export class RenameFile extends BaseAction<void, RenameFileResponse> {
    public actionName: string = ActionName.RenameFile;
    public async _handle(_payload: void): Promise<RenameFileResponse> {
        return { action: "RenameFile" };
    }
}
