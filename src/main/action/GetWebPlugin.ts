
import { WebPlugin } from "../plugin/plugin";
import { WebPluginData } from "../plugin/types";
import { BaseAction } from "./BaseAction";
import { ActionName } from "./types";


export class GetWebPlugin extends BaseAction<void, WebPluginData[]> {
    public actionName: string = ActionName.GetWebPlugin;
    public async _handle(_payload: void): Promise<WebPluginData[]> {
        return WebPlugin.getInstance().getPluginList();
    }
}
