import { ALL_DATA_DIR, ALL_PLUGIN_DIR, LITELOADER_DIR } from "../helper/utils";
import { BaseAction } from "./BaseAction";
import { ActionName } from "./types";

export interface GetAllPathResponse {
    LiteLoaderPath: string;
    PluginPath: string;//所有插件目录 同时注意\\ 结尾无\\
    PluginDataPath: string;
}

export class GetAllPath extends BaseAction<void, GetAllPathResponse> {
    public actionName: string = ActionName.GetAllPath;
    public async _handle(_payload: void): Promise<GetAllPathResponse> {
        const resData: GetAllPathResponse =
        {
            LiteLoaderPath: LITELOADER_DIR,
            PluginPath: ALL_PLUGIN_DIR,
            PluginDataPath: ALL_DATA_DIR,
        };
        return resData;
    }
}
