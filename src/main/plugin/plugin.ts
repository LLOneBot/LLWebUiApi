import { FileStateApi } from "../../common/types";
import { FileSystemApi } from "../api/FileSystemApi";
import fs from "fs";
import path from "path";
import { CoreLog, LogLevel } from "../helper/log";
import { WebPluginData } from "./types";
export class WebPlugin {
    private whiteList: string[] = ["WebUiApi"];
    private PluginList: WebPluginData[] = [];
    static CurrentInstance: WebPlugin;
    static getInstance(): WebPlugin {
        if (!WebPlugin.CurrentInstance) {
            WebPlugin.CurrentInstance = new WebPlugin();
            return WebPlugin.CurrentInstance;
        }
        return WebPlugin.CurrentInstance;
    }
    public setWhiteList(data: string[]) {
        this.whiteList = ["WebUiApi", ...data];
    }
    public loadPluginInfo(path: string) {
        let fileList: FileStateApi[] = FileSystemApi.listFile(path);
        for (let i = 0; i < fileList.length; i++) {
            let manifestPath = path + "\\" + fileList[i].filename + "\\manifest.json";
            try {
                let { result, data } = this.solveManifest(manifestPath, fileList[i].filename as string);
                if (result as boolean) {
                    this.PluginList.push(data);
                }
            }
            catch (e: any) {
                CoreLog.getInstance().pushLog(LogLevel.Error, e.message);
            }
        }
    }
    public getPluginList() {
        return this.PluginList;
    }
    public solveManifest(file: string, base: string) {
        let manifestJson = JSON.parse(fs.readFileSync(file).toString());
        let Plugin: WebPluginData =
        {
            name: manifestJson?.name,
            slug: manifestJson?.slug,
            description: manifestJson?.description,
            manifest_version: manifestJson?.manifest_version,
            version: manifestJson?.version,
            injects:
            {
                main: path.join("\\" + base, manifestJson.injects.main),
                preload: path.join("\\" + base, manifestJson.injects.preload),
                renderer: path.join("\\" + base, manifestJson.injects.renderer)
            }
        };
        if (this.whiteList.includes(manifestJson?.slug)) {
            return { result: false, data: Plugin };
        }
        return { result: true, data: Plugin };
    }
    // 生成Config页面
    public getConfigPage(_base: string, _slug: string) {

    }
}